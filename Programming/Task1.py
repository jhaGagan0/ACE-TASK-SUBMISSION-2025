from collections import Counter

def word_frequency_counter(text):
    """
    Count word frequencies and return the top 3 most frequent words.
    Uses basic Python with built-in functions.
    """
    # Convert to lowercase and split into words
    words = text.lower().split()
    
    # Remove punctuation using built-in methods
    cleaned_words = []
    for word in words:
        clean_word = word.strip('.,!?";:()[]{}')  # Remove common punctuation
        if clean_word:
            cleaned_words.append(clean_word)
    
    # Count frequencies using dictionary (HashMap approach)
    word_count = {}
    for word in cleaned_words:
        word_count[word] = word_count.get(word, 0) + 1
    
    # Sort using built-in sorted() function
    sorted_words = sorted(word_count.items(), key=lambda x: x[1], reverse=True)
    
    # Return top 3
    return sorted_words[:3]


# ===== Main Program (Interactive) =====
text = input("Enter a paragraph: ")

print("\nTop 3 most frequent words (basic method):")
top_words = word_frequency_counter(text)

for i, (word, count) in enumerate(top_words, 1):
    print(f"{i}. {word}: {count} times")


# ===== Alternative Shorter Version (Using Counter) =====
def word_frequency_counter_counter(text):
    # Clean text: lowercase and strip punctuation
    words = [w.strip('.,!?";:()[]{}') for w in text.lower().split() if w.strip('.,!?";:()[]{}')]
    
    # Use Counter for counting
    return Counter(words).most_common(3)


print("\nTop 3 most frequent words (using Counter):")
top_words_counter = word_frequency_counter_counter(text)

for i, (word, count) in enumerate(top_words_counter, 1):
    print(f"{i}. {word}: {count} times")
