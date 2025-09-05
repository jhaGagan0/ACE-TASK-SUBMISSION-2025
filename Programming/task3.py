# Basic Library Management System with OOP

class Book:
    """Simple Book class to store title and author."""
    
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __str__(self):
        return f"'{self.title}' by {self.author}"


class Library:
    """Simple Library class to manage books."""
    
    def __init__(self):
        self.books = []  # List to store Book objects
    
    def add_book(self, title, author):
        """Add a new book to the library."""
        if title and author:  # Check if not empty
            book = Book(title, author)
            self.books.append(book)
            print(f"Added: {book}")
        else:
            print("Title and author cannot be empty!")
    
    def search_by_title(self, search_title):
        """Search for books by title."""
        found_books = []
        search_title = search_title.lower()
        
        for book in self.books:
            if search_title in book.title.lower():
                found_books.append(book)
        
        if found_books:
            print(f"Found {len(found_books)} book(s):")
            for book in found_books:
                print(f"  {book}")
        else:
            print("No books found with that title.")
        
        return found_books
    
    def show_all_books(self):
        """Show all books in the library."""
        if not self.books:
            print("No books in the library.")
            return
        
        print(f"\nAll Books ({len(self.books)} total):")
        for i, book in enumerate(self.books, 1):
            print(f"{i}. {book}")


def main():
    """Main program."""
    library = Library()  # Create Library object
    
    print("=== Library Management System ===")
    
    while True:
        print("\nChoose an option:")
        print("1. Add book")
        print("2. Search book by title")
        print("3. Show all books")
        print("4. Quit")
        
        choice = input("Enter choice (1-4): ")
        
        if choice == "1":
            title = input("Enter book title: ")
            author = input("Enter book author: ")
            library.add_book(title, author)
        
        elif choice == "2":
            search_title = input("Enter title to search: ")
            library.search_by_title(search_title)
        
        elif choice == "3":
            library.show_all_books()
        
        elif choice == "4":
            print("Goodbye!")
            break
        
        else:
            print("Invalid choice! Please enter 1, 2, 3, or 4.")


# Run the program
if __name__ == "__main__":
    main()