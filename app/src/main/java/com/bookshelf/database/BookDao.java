package com.bookshelf.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;
import androidx.room.Update;

import com.bookshelf.model.Book;

import java.util.List;

@Dao
public interface BookDao {
    @Query("SELECT * FROM books ORDER BY id DESC")
    List<Book> getAllBooks();

    @Query("SELECT * FROM books WHERE id = :bookId")
    Book getBookById(long bookId);

    @Insert
    long insertBook(Book book);

    @Update
    void updateBook(Book book);

    @Delete
    void deleteBook(Book book);

    @Query("DELETE FROM books WHERE id = :bookId")
    void deleteBookById(long bookId);
}
