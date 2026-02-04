import csv
import datetime
import os

question_file = 'question.csv'
answer_file = 'answer.csv'
log_file = 'debug_log.txt'

def log(msg):
    with open(log_file, 'a') as f:
        f.write(msg + '\n')

log("Starting generation script...")

answers = []
answer_count = 1
current_date = datetime.date.today().isoformat()

if not os.path.exists(question_file):
    log(f"Error: {question_file} not found.")
    exit(1)

try:
    with open(question_file, mode='r', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        row_count = 0
        for row in reader:
            row_count += 1
            q_id = row['id']
            options_str = row['options']
            options = [opt.strip() for opt in options_str.split(',')]
            
            for i, option_text in enumerate(options):
                is_correct = 'true' if i == 0 else 'false'
                answers.append({
                    'id': f'a{answer_count}',
                    'text': option_text,
                    'isCorrect': is_correct,
                    'questionId': q_id,
                    'createdAt': current_date,
                    'updatedAt': current_date
                })
                answer_count += 1
        log(f"Read {row_count} questions.")
except Exception as e:
    log(f"Error reading questions: {e}")
    exit(1)

log(f"Generated {len(answers)} answers.")

try:
    header = ['id', 'text', 'isCorrect', 'questionId', 'createdAt', 'updatedAt']
    with open(answer_file, mode='w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=header)
        writer.writeheader()
        writer.writerows(answers)
    log(f"Successfully wrote to {answer_file}")
except Exception as e:
    log(f"Error writing answers: {e}")
    exit(1)
