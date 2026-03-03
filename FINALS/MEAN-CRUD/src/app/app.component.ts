import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Bookshelf';
  readonly APIUrl = "http://localhost:5038/api/books/";

  books: any[] = [];
  searchTerm: string = '';
  isEditing: boolean = false;

  currentBook: any = {
    id: null,
    title: '',
    author: '',
    genre: '',
    desc: '', // We use 'desc' internally for the textarea
    price: null
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  get filteredBooks() {
    return this.books.filter(book =>
      (book.title?.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
      (book.author?.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  refreshBooks() {
    this.http.get<any[]>(this.APIUrl + 'GetBooks').subscribe(data => {
      this.books = data;
    });
  }

  saveBook() {
    const formData = new FormData();
    formData.append("title", this.currentBook.title);
    formData.append("author", this.currentBook.author);
    formData.append("genre", this.currentBook.genre);
    formData.append("description", this.currentBook.desc); // Map internal 'desc' to 'description'
    formData.append("price", this.currentBook.price?.toString() || "0");

    if (this.isEditing) {
      this.http.put(`${this.APIUrl}UpdateBook?id=${this.currentBook.id}`, formData).subscribe(() => {
        this.resetForm();
        this.refreshBooks();
      });
    } else {
      this.http.post(this.APIUrl + 'AddBook', formData).subscribe(() => {
        this.resetForm();
        this.refreshBooks();
      });
    }
  }

  editBook(book: any) {
    this.isEditing = true;
    this.currentBook = {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      desc: book.description, // Map database field 'description' to form 'desc'
      price: book.price
    };
  }

  deleteBook(id: any) {
    if(confirm('Are you sure?')) {
      this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe(() => {
        this.refreshBooks();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentBook = { id: null, title: '', author: '', genre: '', desc: '', price: null };
  }
}
