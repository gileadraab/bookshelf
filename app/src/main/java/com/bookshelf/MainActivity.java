package com.bookshelf;

import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bookshelf.adapter.BookAdapter;
import com.bookshelf.database.BookDatabase;
import com.bookshelf.model.Book;
import com.bookshelf.ui.AddEditBookDialog;
import com.bookshelf.ui.BookDetailDialog;
import com.google.android.material.button.MaterialButton;

import java.util.List;

public class MainActivity extends AppCompatActivity implements BookAdapter.OnBookClickListener {
    private RecyclerView recyclerViewBooks;
    private LinearLayout emptyStateLayout;
    private ImageView bottomIllustration;
    private MaterialButton btnAddBook;
    private BookAdapter bookAdapter;
    private BookDatabase database;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        setupRecyclerView();
        setupDatabase();
        loadBooks();
        setupListeners();
    }

    private void initViews() {
        recyclerViewBooks = findViewById(R.id.recyclerViewBooks);
        emptyStateLayout = findViewById(R.id.emptyStateLayout);
        bottomIllustration = findViewById(R.id.bottomIllustration);
        btnAddBook = findViewById(R.id.btnAddBook);
    }

    private void setupRecyclerView() {
        bookAdapter = new BookAdapter(this, this);

        // Use 1 column for single row display
        GridLayoutManager layoutManager = new GridLayoutManager(this, 1);

        recyclerViewBooks.setLayoutManager(layoutManager);
        recyclerViewBooks.setAdapter(bookAdapter);
    }

    private void setupDatabase() {
        database = BookDatabase.getInstance(this);
    }

    private void loadBooks() {
        List<Book> books = database.bookDao().getAllBooks();
        bookAdapter.setBooks(books);
        updateEmptyState(books.isEmpty());
    }

    private void updateEmptyState(boolean isEmpty) {
        if (isEmpty) {
            emptyStateLayout.setVisibility(View.VISIBLE);
            recyclerViewBooks.setVisibility(View.GONE);
            bottomIllustration.setVisibility(View.GONE);
            btnAddBook.setText(R.string.add_first_book);
        } else {
            emptyStateLayout.setVisibility(View.GONE);
            recyclerViewBooks.setVisibility(View.VISIBLE);
            bottomIllustration.setVisibility(View.VISIBLE);
            btnAddBook.setText(R.string.add_new_book);
        }
    }

    private void setupListeners() {
        btnAddBook.setOnClickListener(v -> showAddBookDialog());
    }

    private void showAddBookDialog() {
        AddEditBookDialog dialog = new AddEditBookDialog(this, null, book -> {
            // Save new book to database
            long id = database.bookDao().insertBook(book);
            book.setId(id);
            loadBooks(); // Reload all books
        });
        dialog.show();
    }

    private void showEditBookDialog(Book book) {
        AddEditBookDialog dialog = new AddEditBookDialog(this, book, updatedBook -> {
            // Update book in database
            database.bookDao().updateBook(updatedBook);
            loadBooks(); // Reload all books
        });
        dialog.show();
    }

    private void showBookDetailDialog(Book book) {
        BookDetailDialog dialog = new BookDetailDialog(this, book, new BookDetailDialog.OnBookActionListener() {
            @Override
            public void onEditClick(Book book) {
                showEditBookDialog(book);
            }

            @Override
            public void onDeleteClick(Book book) {
                deleteBook(book);
            }
        });
        dialog.show();
    }

    private void deleteBook(Book book) {
        database.bookDao().deleteBook(book);
        loadBooks();
    }

    // BookAdapter.OnBookClickListener implementation
    @Override
    public void onBookClick(Book book) {
        showBookDetailDialog(book);
    }

    @Override
    public void onEditClick(Book book) {
        showEditBookDialog(book);
    }

    @Override
    public void onDeleteClick(Book book) {
        deleteBook(book);
    }
}
