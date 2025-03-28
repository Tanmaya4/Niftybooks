#works but only advantage is that it can generate a pdf and you can give the input from the terminal but still the content is not good 

import yaml
import os
from crewai import Agent, Task, Crew
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from pydantic import BaseModel
from typing import List

# Set OpenRouter API configuration
os.environ['OPENAI_BASE_URL'] = 'https://openrouter.ai/api/v1'
os.environ['OPENAI_API_KEY'] = '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'
os.environ['OPENAI_MODEL_NAME'] = 'deepseek/deepseek-chat-v3-0324:free'

# Load YAML configurations
files = {
    'content_agents': 'config/book_content_agents.yaml',
    'content_tasks': 'config/book_content_tasks.yaml',
    'edit_agents': 'config/book_editing_agents.yaml',
    'edit_tasks': 'config/book_editing_tasks.yaml'
}

configs = {}
for config_type, file_path in files.items():
    with open(file_path, 'r') as file:
        configs[config_type] = yaml.safe_load(file)

content_agents_config = configs['content_agents']
content_tasks_config = configs['content_tasks']
edit_agents_config = configs['edit_agents']
edit_tasks_config = configs['edit_tasks']

# Pydantic Models (using V2)
class BookOutline(BaseModel):
    title: str
    chapters: List[str]
    genre: str

class ChapterContent(BaseModel):
    chapter_title: str
    content: str

class ChaptersOutput(BaseModel):
    chapters: List[ChapterContent]

class EditedBook(BaseModel):
    outline: BookOutline
    chapters: List[ChapterContent]

# Agents
outline_generator = Agent(config=content_agents_config['outline_generator'])
chapter_writer = Agent(config=content_agents_config['chapter_writer'])
grammar_editor = Agent(config=edit_agents_config['grammar_editor'])

# Tasks
outline_task = Task(
    config=content_tasks_config['generate_outline'],
    agent=outline_generator,
    output_pydantic=BookOutline
)

writing_task = Task(
    config=content_tasks_config['write_chapters'],
    agent=chapter_writer,
    context=[outline_task],
    output_pydantic=ChaptersOutput
)

edit_task = Task(
    config=edit_tasks_config['grammar_check'],
    agent=grammar_editor,
    context=[outline_task, writing_task],
    output_pydantic=EditedBook
)

# Single Crew
book_crew = Crew(
    agents=[outline_generator, chapter_writer, grammar_editor],
    tasks=[outline_task, writing_task, edit_task],
    verbose=False  # Suppress intermediate outputs
)

# Main function to generate story and PDF
def generate_story(title: str, genre: str):
    book_idea = {"book_data": {"title": title, "genre": genre, "chapter_count": 3}}
    
    # Generate story
    task_results = book_crew.kickoff(book_idea)
    final_book = task_results[-1].output  # Get the final EditedBook output
    
    # Generate PDF
    pdf_file = f"{title}.pdf"
    doc = SimpleDocTemplate(pdf_file, pagesize=letter)
    styles = getSampleStyleSheet()
    story = [
        Paragraph(final_book.outline.title, styles['Title']),
        Spacer(1, 12)
    ]
    
    for chapter in final_book.chapters:
        story.append(Paragraph(chapter.chapter_title, styles['Heading1']))
        story.append(Paragraph(chapter.content, styles['BodyText']))
        story.append(Spacer(1, 12))
    
    doc.build(story)
    print(f"PDF saved as: {pdf_file}")

if __name__ == "__main__":
    # Prompt user for input
    title = input("Enter the book title: ")
    genre = input("Enter the book genre: ")
    generate_story(title, genre)