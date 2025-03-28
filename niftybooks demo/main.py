# Warning control
import warnings
warnings.filterwarnings('ignore')

# Load environment variables
import os
import yaml
from crewai import Agent, Task, Crew
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet
import requests
from io import BytesIO

# Set OpenRouter API configuration
os.environ['OPENAI_BASE_URL'] = 'https://openrouter.ai/api/v1'
os.environ['OPENAI_API_KEY'] = 'APIKEY'  # Replace with your actual API key
os.environ['OPENAI_MODEL_NAME'] = 'MODELNAME'  # Text model for content generation

# Define file paths for YAML configurations
files = {
    'content_agents': 'config/book_content_agents.yaml',
    'content_tasks': 'config/book_content_tasks.yaml',
    'edit_agents': 'config/book_editing_agents.yaml',
    'edit_tasks': 'config/book_editing_tasks.yaml',
    'image_agents': 'config/book_image_agents.yaml',
    'image_tasks': 'config/book_image_tasks.yaml'
}

# Load configurations from YAML files
configs = {}
for config_type, file_path in files.items():
    with open(file_path, 'r') as file:
        configs[config_type] = yaml.safe_load(file)

# Assign loaded configurations to specific variables
content_agents_config = configs['content_agents']
content_tasks_config = configs['content_tasks']
edit_agents_config = configs['edit_agents']
edit_tasks_config = configs['edit_tasks']
image_agents_config = configs['image_agents']
image_tasks_config = configs['image_tasks']

# Create Pydantic Models for Structured Output
from pydantic import BaseModel, Field
from typing import List, Optional

class BookOutline(BaseModel):
    title: str = Field(..., description="The title of the book.")
    chapters: List[str] = Field(..., description="List of chapter titles.")
    genre: str = Field(..., description="The genre of the book.")
    target_audience: str = Field(..., description="Intended readership.")

class ChapterContent(BaseModel):
    chapter_title: str = Field(..., description="Title of the chapter.")
    word_count: int = Field(..., ge=0, description="Word count of the chapter content.")
    content: str = Field(..., description="The full text of the chapter.")
    tone: str = Field(..., description="The tone of the writing (e.g., formal, casual).")

class ChapterImage(BaseModel):
    chapter_title: str = Field(..., description="Title of the chapter the image corresponds to.")
    image_url: str = Field(..., description="URL of the generated image.")

class EditedBook(BaseModel):
    outline: BookOutline = Field(..., description="The book's outline.")
    chapters: List[ChapterContent] = Field(..., description="List of edited chapter contents.")
    images: List[ChapterImage] = Field(..., description="List of images for each chapter.")
    edit_notes: Optional[str] = Field(None, description="Notes from the editing process.")

# Importing Tools
from crewai_tools import SerperDevTool, ScrapeWebsiteTool
os.environ["SERPER_API_KEY"] = "APIKEY"

# Book Content Creation Crew, Agents and Tasks
content_researcher = Agent(
    config=content_agents_config['content_researcher'],
    tools=[SerperDevTool(), ScrapeWebsiteTool()]
)

chapter_writer = Agent(
    config=content_agents_config['chapter_writer'],
    tools=[SerperDevTool()]
)

outline_generator = Agent(
    config=content_agents_config['outline_generator']
)

outline_task = Task(
    config=content_tasks_config['generate_outline'],
    agent=outline_generator,
    output_pydantic=BookOutline
)

research_task = Task(
    config=content_tasks_config['research_content'],
    agent=content_researcher,
    context=[outline_task]
)

writing_task = Task(
    config=content_tasks_config['write_chapters'],
    agent=chapter_writer,
    context=[outline_task, research_task],
    output_pydantic=ChapterContent
)

content_crew = Crew(
    agents=[outline_generator, content_researcher, chapter_writer],
    tasks=[outline_task, research_task, writing_task],
    verbose=True
)

# Book Editing Crew
grammar_editor = Agent(
    config=edit_agents_config['grammar_editor']
)

style_consistency_agent = Agent(
    config=edit_agents_config['style_consistency_agent']
)

grammar_task = Task(
    config=edit_tasks_config['grammar_check'],
    agent=grammar_editor
)

style_task = Task(
    config=edit_tasks_config['style_consistency'],
    agent=style_consistency_agent,
    context=[grammar_task],
    output_pydantic=EditedBook
)

edit_crew = Crew(
    agents=[grammar_editor, style_consistency_agent],
    tasks=[grammar_task, style_task],
    verbose=True
)

# Book Image Generation Crew
image_generator = Agent(
    config=image_agents_config['image_generator']
)

image_task = Task(
    config=image_tasks_config['generate_chapter_images'],
    agent=image_generator,
    context=[style_task],
    output_pydantic=ChapterImage
)

image_crew = Crew(
    agents=[image_generator],
    tasks=[image_task],
    verbose=True
)

# Book Creation Process
def create_book():
    # Simulated book idea input
    book_ideas = [
        {
            "book_data": {
                "title": "The Future of AI",
                "genre": "Non-fiction",
                "audience": "Tech enthusiasts",
                "chapter_count": 5
            }
        }
    ]

    # Generate content
    content_results = content_crew.kickoff(book_ideas[0])
    
    # Edit the book
    edited_books = edit_crew.kickoff(content_results)
    
    # Generate images
    image_results = image_crew.kickoff(edited_books)
    
    # Combine results into final book structure
    final_book = edited_books.pydantic
    final_book.images = [img.pydantic for img in image_results]
    
    return final_book

# Generate PDF
def generate_pdf(book: EditedBook, output_file="book.pdf"):
    doc = SimpleDocTemplate(output_file, pagesize=letter)
    styles = getSampleStyleSheet()
    story = []

    # Add title
    story.append(Paragraph(book.outline.title, styles['Title']))
    story.append(Spacer(1, 12))

    # Add chapters and images
    for chapter, image in zip(book.chapters, book.images):
        story.append(Paragraph(chapter.chapter_title, styles['Heading1']))
        story.append(Paragraph(chapter.content, styles['BodyText']))
        story.append(Spacer(1, 12))
        
        # Download and add image
        response = requests.get(image.image_url)
        img_data = BytesIO(response.content)
        img = Image(img_data, width=200, height=200)
        story.append(img)
        story.append(Spacer(1, 12))

    # Build PDF
    doc.build(story)
    print(f"PDF generated: {output_file}")

# Run the process
if __name__ == "__main__":
    final_book = create_book()
    
    # Generate PDF
    generate_pdf(final_book)
    
    # Usage Metrics and Costs
    # import pandas as pd
    # df_content_metrics = pd.DataFrame([content_crew.tasks[0].token_usage.dict()])
    # content_costs = 0.150 * df_content_metrics['total_tokens'].sum() / 1_000_000
    # print(f"Total costs for content generation: ${content_costs:.4f}")
    
    # df_edit_metrics = pd.DataFrame([edit_crew.tasks[0].token_usage.dict()])
    # edit_costs = 0.150 * df_edit_metrics['total_tokens'].sum() / 1_000_000
    # print(f"Total costs for editing: ${edit_costs:.4f}")
    
    # df_image_metrics = pd.DataFrame([image_crew.tasks[0].token_usage.dict()])
    # image_costs = 0.150 * df_image_metrics['total_tokens'].sum() / 1_000_000
    # print(f"Total costs for image generation: ${image_costs:.4f}")
    
    # Inspecting Results
    data = {
        'Title': final_book.outline.title,
        'Genre': final_book.outline.genre,
        'Target Audience': final_book.outline.target_audience,
        'Chapter Count': len(final_book.outline.chapters),
        'First Chapter Title': final_book.chapters[0].chapter_title,
        'First Chapter Word Count': final_book.chapters[0].word_count,
        'First Image URL': final_book.images[0].image_url,
        'Edit Notes': final_book.edit_notes
    }
    
    # df = pd.DataFrame.from_dict(data, orient='index', columns=['Value'])
    # df = df.reset_index().rename(columns={'index': 'Attribute'})
    # html_table = df.style.set_properties(**{'text-align': 'left'}) \
    #                     .format({'Attribute': lambda x: f'<b>{x}</b>'}) \
    #                     .hide(axis='index') \
    #                     .to_html()
    
    # from IPython.display import display, HTML
    # display(HTML(html_table))
    
    # Display Sample Chapter Content
    import textwrap
    sample_chapter = final_book.chapters[0].content
    wrapped_text = textwrap.fill(sample_chapter[:500], width=80)
    print("Sample Chapter Content:")
    print(wrapped_text)