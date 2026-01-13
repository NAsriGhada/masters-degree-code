from dataclasses import dataclass
from typing import Optional, List


# 1) Contact class
@dataclass
class Contact:
    name: str
    phone: str


# 2) Doubly linked list node
class Node:
    def __init__(self, contact: Contact):
        self.contact: Contact = contact
        self.prev: Optional["Node"] = None
        self.next: Optional["Node"] = None


# 2) Doubly linked list
class DoublyLinkedList:
    def __init__(self):
        self.head: Optional[Node] = None
        self.tail: Optional[Node] = None
        self.size: int = 0

    def append(self, contact: Contact) -> None:
        new_node = Node(contact)
        if self.head is None:
            self.head = self.tail = new_node
        else:
            assert self.tail is not None
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
        self.size += 1

    def forward(self) -> List[Contact]:
        result: List[Contact] = []
        cur = self.head
        while cur is not None:
            result.append(cur.contact)
            cur = cur.next
        return result

    def backward(self) -> List[Contact]:
        result: List[Contact] = []
        cur = self.tail
        while cur is not None:
            result.append(cur.contact)
            cur = cur.prev
        return result


# 4) Substring matching (naive)
def naive_substring_search(text: str, pattern: str) -> bool:
    """
    Returns True if pattern is found in text (substring), else False.
    Case-insensitive is handled by the caller if desired.
    """
    n = len(text)
    m = len(pattern)

    if m == 0:
        return True
    if m > n:
        return False

    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match:
            return True
    return False


class ContactManager:
    def __init__(self):
        self.contacts_list = DoublyLinkedList()
        # 3) Hash table: name -> Contact (same object reference stored in list)
        self.contacts_by_name: dict[str, Contact] = {}

    def add_contact(self, name: str, phone: str) -> bool:
        name = name.strip()
        phone = phone.strip()

        if not name or not phone:
            return False

        # If you want to allow duplicates, you'd need name->list[Contact].
        # For simplicity (per instructions), we treat name as unique.
        if name in self.contacts_by_name:
            return False

        contact = Contact(name=name, phone=phone)
        self.contacts_list.append(contact)
        self.contacts_by_name[name] = contact
        return True

    def search_by_exact_name(self, name: str) -> Optional[Contact]:
        return self.contacts_by_name.get(name.strip())

    def search_by_keyword(self, keyword: str) -> List[Contact]:
        keyword = keyword.strip()
        if not keyword:
            return []

        # Case-insensitive substring search
        key_low = keyword.lower()
        matches: List[Contact] = []
        for c in self.contacts_list.forward():
            if naive_substring_search(c.name.lower(), key_low):
                matches.append(c)
        return matches

    def display_forward(self) -> List[Contact]:
        return self.contacts_list.forward()

    def display_backward(self) -> List[Contact]:
        return self.contacts_list.backward()


def print_menu() -> None:
    print("\n1. Add Contact")
    print("2. Search by Keyword")
    print("3. Search by Exact Name")
    print("4. View All (Forward)")
    print("5. View All (Backward)")
    print("6. Exit\n")


def main() -> None:
    manager = ContactManager()

    while True:
        print_menu()
        option = input("Enter option: ").strip()

        if option == "1":
            name = input("Name: ")
            phone = input("Phone: ")
            if manager.add_contact(name, phone):
                print("Contact added.")
            else:
                print("Failed to add contact (empty fields or name already exists).")

        elif option == "2":
            keyword = input("Search keyword: ")
            matches = manager.search_by_keyword(keyword)
            if not matches:
                print("No matches found.")
            else:
                for c in matches:
                    print(f"Match found: {c.name} - {c.phone}")

        elif option == "3":
            name = input("Exact name: ")
            contact = manager.search_by_exact_name(name)
            if contact is None:
                print("No contact found with that exact name.")
            else:
                print(f"Found: {contact.name} - {contact.phone}")

        elif option == "4":
            contacts = manager.display_forward()
            if not contacts:
                print("No contacts to display.")
            else:
                for c in contacts:
                    print(f"{c.name} - {c.phone}")

        elif option == "5":
            contacts = manager.display_backward()
            if not contacts:
                print("No contacts to display.")
            else:
                for c in contacts:
                    print(f"{c.name} - {c.phone}")

        elif option == "6":
            print("Goodbye!")
            break

        else:
            print("Invalid option. Please choose 1-6.")


if __name__ == "__main__":
    main()
