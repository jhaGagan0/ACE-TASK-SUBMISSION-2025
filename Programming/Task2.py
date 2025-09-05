# Simple Quiz App in Basic Python

# Quiz questions - using simple lists
questions = [
    "What is the capital of France?",
    "Which programming language is known as the 'language of the web'?", 
    "What is 2 + 2 * 3?",
    "Which planet is known as the 'Red Planet'?",
    "In which year did World War II end?"
]

# Answer options for each question
options = [
    ["A) London", "B) Berlin", "C) Paris", "D) Madrid"],
    ["A) Python", "B) JavaScript", "C) Java", "D) C++"],
    ["A) 12", "B) 8", "C) 10", "D) 6"],
    ["A) Venus", "B) Jupiter", "C) Mars", "D) Saturn"],
    ["A) 1944", "B) 1945", "C) 1946", "D) 1947"]
]

# Correct answers
correct_answers = ["C", "B", "B", "C", "B"]

# Welcome message
print("=" * 40)
print("WELCOME TO THE QUIZ APP!")
print("=" * 40)
print("Answer 5 multiple-choice questions.")
print("Type A, B, C, or D for your answer")
print("=" * 40)

# Variables to track progress
score = 0
user_answers = []

# Ask each question
for i in range(5):
    print("\nQuestion", i + 1, "of 5:")
    print(questions[i])
    print()
    
    # Show answer options
    for option in options[i]:
        print(option)
    
    # Get user answer
    while True:
        answer = input("\nYour answer: ").strip().upper()
        
        if answer in ["A", "B", "C", "D"]:
            user_answers.append(answer)
            break
        else:
            print("Invalid input! Please enter A, B, C, or D.")
    
    # Check if answer is correct
    if answer == correct_answers[i]:
        print("Correct!")
        score += 1
    else:
        print("Wrong! The correct answer was", correct_answers[i])
    
    print("-" * 30)

# Show final results
print("\n" + "=" * 40)
print("QUIZ COMPLETED!")
print("=" * 40)

print("Your final score:", score, "out of 5")
print("Percentage:", score * 20, "%")

# Give feedback based on score
if score == 5:
    print("Perfect! Outstanding!")
elif score == 4:
    print("Excellent! Great job!")
elif score == 3:
    print("Good work!")
elif score == 2:
    print("Not bad! Keep trying!")
else:
    print("Keep practicing!")

# Show all answers
print("\nAnswer Summary:")
print("-" * 20)
for i in range(5):
    status = "Correct" if user_answers[i] == correct_answers[i] else "Wrong"
    print(f"Q{i+1}: You answered {user_answers[i]}, Correct was {correct_answers[i]} - {status}")

print("\nThanks for playing!")
