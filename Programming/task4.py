# Personal Expense Tracker - Console Application
# Allows users to track expenses by category and view spending summaries.

from datetime import datetime
import sys

class ExpenseTracker:
    def __init__(self):
        # Dictionary to store expenses by category
        self.expenses = {}
        self.categories = [
            "Food & Dining", "Transportation", "Shopping", "Entertainment",
            "Bills & Utilities", "Healthcare", "Travel", "Education", "Other"
        ]
    
    def display_menu(self):
        """Display the main menu options"""
        print("\n" + "="*50)
        print("   💰 PERSONAL EXPENSE TRACKER 💰")
        print("="*50)
        print("1. Add Expense")
        print("2. View Total Expenses")
        print("3. View Category Breakdown")
        print("4. View All Expenses")
        print("5. View Categories")
        print("6. Exit")
        print("-"*50)
    
    def display_categories(self):
        """Display available expense categories"""
        print("\nAvailable Categories:")
        for i, category in enumerate(self.categories, 1):
            print(f"{i}. {category}")
        print(f"{len(self.categories) + 1}. Custom Category")
    
    def add_expense(self):
        """Add a new expense to the tracker"""
        print("\n📝 Adding New Expense")
        print("-" * 25)
        
        # Get expense amount
        while True:
            try:
                amount = float(input("Enter expense amount: $"))
                if amount <= 0:
                    print("❌ Amount must be positive. Please try again.")
                    continue
                break
            except ValueError:
                print("❌ Invalid amount. Please enter a number.")
        
        # Get category
        self.display_categories()
        while True:
            try:
                choice = int(input(f"\nSelect category (1-{len(self.categories) + 1}): "))
                if 1 <= choice <= len(self.categories):
                    category = self.categories[choice - 1]
                    break
                elif choice == len(self.categories) + 1:
                    category = input("Enter custom category name: ").strip()
                    if not category:
                        print("❌ Category name cannot be empty.")
                        continue
                    break
                else:
                    print(f"❌ Please enter a number between 1 and {len(self.categories) + 1}")
            except ValueError:
                print("❌ Invalid input. Please enter a number.")
        
        # Get description (optional)
        description = input("Enter description (optional): ").strip()
        if not description:
            description = "No description"
        
        # Create expense record
        expense = {
            'amount': amount,
            'description': description,
            'date': datetime.now().strftime("%Y-%m-%d %H:%M")
        }
        
        # ✅ FIX: Initialize category if it doesn’t exist
        if category not in self.expenses:
            self.expenses[category] = []
        self.expenses[category].append(expense)
        
        print(f"\n✅ Expense added successfully!")
        print(f"   Amount: ${amount:.2f}")
        print(f"   Category: {category}")
        print(f"   Description: {description}")
    
    def view_total_expenses(self):
        """Display total expenses across all categories"""
        print("\n💵 Total Expenses Summary")
        print("-" * 30)
        
        if not self.expenses:
            print("No expenses recorded yet.")
            return
        
        total = 0
        for category, expense_list in self.expenses.items():
            category_total = sum(expense['amount'] for expense in expense_list)
            total += category_total
        
        print(f"Total Amount Spent: ${total:.2f}")
        print(f"Number of Categories: {len(self.expenses)}")
        print(f"Total Transactions: {sum(len(expenses) for expenses in self.expenses.values())}")
    
    def view_category_breakdown(self):
        """Display expenses broken down by category"""
        print("\n📊 Category Breakdown")
        print("-" * 25)
        
        if not self.expenses:
            print("No expenses recorded yet.")
            return
        
        # Calculate total for percentage calculation
        grand_total = sum(
            sum(expense['amount'] for expense in expense_list)
            for expense_list in self.expenses.values()
        )
        
        # Sort categories by total spending (highest first)
        sorted_categories = sorted(
            self.expenses.items(),
            key=lambda x: sum(expense['amount'] for expense in x[1]),
            reverse=True
        )
        
        print(f"{'Category':<20} {'Amount':<12} {'Count':<8} {'%':<6}")
        print("-" * 50)
        
        for category, expense_list in sorted_categories:
            category_total = sum(expense['amount'] for expense in expense_list)
            percentage = (category_total / grand_total) * 100
            count = len(expense_list)
            
            print(f"{category:<20} ${category_total:<11.2f} {count:<8} {percentage:<5.1f}%")
        
        print("-" * 50)
        print(f"{'TOTAL':<20} ${grand_total:<11.2f}")
    
    def view_all_expenses(self):
        """Display all expenses with details"""
        print("\n📋 All Expenses")
        print("-" * 20)
        
        if not self.expenses:
            print("No expenses recorded yet.")
            return
        
        for category, expense_list in self.expenses.items():
            print(f"\n🏷️  {category.upper()}")
            print("-" * len(category) + "---")
            
            for expense in expense_list:
                print(f"   ${expense['amount']:<8.2f} | {expense['date']} | {expense['description']}")
    
    def view_categories_list(self):
        """Display all available categories"""
        print("\n📂 Available Categories")
        print("-" * 25)
        
        for i, category in enumerate(self.categories, 1):
            print(f"{i}. {category}")
        
        # Show custom categories if any exist
        custom_categories = [cat for cat in self.expenses.keys() if cat not in self.categories]
        if custom_categories:
            print("\nCustom Categories:")
            for category in custom_categories:
                print(f"   • {category}")
    
    def run(self):
        """Main application loop"""
        print("Welcome to Personal Expense Tracker!")
        print("Track your spending and manage your budget effectively.")
        
        while True:
            self.display_menu()
            
            try:
                choice = input("Enter your choice (1-6): ").strip()
                
                if choice == '1':
                    self.add_expense()
                elif choice == '2':
                    self.view_total_expenses()
                elif choice == '3':
                    self.view_category_breakdown()
                elif choice == '4':
                    self.view_all_expenses()
                elif choice == '5':
                    self.view_categories_list()
                elif choice == '6':
                    print("\n👋 Thank you for using Personal Expense Tracker!")
                    print("Stay on top of your finances! 💪")
                    sys.exit(0)
                else:
                    print("❌ Invalid choice. Please select 1-6.")
                
                # Wait for user before showing menu again
                input("\nPress Enter to continue...")
                
            except KeyboardInterrupt:
                print("\n\n👋 Goodbye!")
                sys.exit(0)
            except Exception as e:
                print(f"❌ An error occurred: {e}")
                input("Press Enter to continue...")

def main():
    """Entry point of the application"""
    tracker = ExpenseTracker()
    tracker.run()

if __name__ == "__main__":
    main()
