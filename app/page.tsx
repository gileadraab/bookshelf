"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Book, Star, Edit, Trash2 } from "lucide-react";
import { AddBookDialog } from "@/components/add-book-dialog";
import { BookDetailDialog } from "@/components/book-detail-dialog";
import { EditBookDialog } from "@/components/edit-book-dialog";
import { EmptyStateIllustration } from "@/components/empty-state-illustration";
import Image from "next/image";
import { Alex_Brush } from "next/font/google";

const alexBrush = Alex_Brush({
  weight: "400", // Font weight (Alex Brush only has 400)
  subsets: ["latin"], // Character subsets to include
  display: "swap", // Font display strategy
});

interface BookType {
  id: string;
  title: string;
  author: string;
  rating: number;
  comment: string;
  dateAdded: string;
}

export default function HomePage() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Load books from localStorage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem("myReadBooks");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("myReadBooks", JSON.stringify(books));
  }, [books]);

  const addBook = (bookData: Omit<BookType, "id" | "dateAdded">) => {
    const newBook: BookType = {
      ...bookData,
      id: Date.now().toString(),
      dateAdded: new Date().toLocaleDateString(),
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (updatedBook: BookType) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === updatedBook.id ? updatedBook : book)),
    );
  };

  const deleteBook = (bookId: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== bookId));
  };

  const openBookDetail = (book: BookType) => {
    setSelectedBook(book);
    setIsDetailDialogOpen(true);
  };

  const openEditDialog = (book: BookType) => {
    setSelectedBook(book);
    setIsEditDialogOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "fill-amber-400 text-amber-400" : "text-amber-200"}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-2 sm:px-4 py-4 md:py-8 pb-16 md:pb-20 max-w-7xl">
        {/* Content Area */}
        {books.length === 0 ? (
          <div className="flex flex-col min-h-[85vh] px-4">
            {/* Small top spacer */}
            <div className="h-8 md:h-0"></div>

            {/* Main centered content */}
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Header */}
              <div className="text-center mb-6 md:mb-8 px-2">
                <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                  <Book className="w-6 h-6 md:w-8 md:h-8 text-amber-700" />
                  <h1
                    className={`text-3xl md:text-5xl font-normal text-amber-900 ${alexBrush.className}`}
                  >
                    Bookshelf
                  </h1>
                </div>
                <p className="text-amber-700 text-base md:text-lg">
                  Keep track of your literary journey
                </p>
              </div>

              {/* Illustration */}
              <div className="mb-6 md:mb-8">
                <EmptyStateIllustration />
              </div>

              {/* Add Book Button */}
              <div className="mb-8 md:mb-12">
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-amber-700 hover:bg-amber-800 text-white px-6 md:px-8 py-3 md:py-4 text-lg md:text-xl shadow-lg"
                >
                  <Plus className="w-5 h-5 md:w-6 md:h-6 mr-2" />
                  Add Your First Book
                </Button>
              </div>
            </div>

            {/* Bottom aligned text */}
            <div className="text-center pb-8 md:pb-12">
              <h3 className="text-xl md:text-2xl font-semibold text-amber-800 mb-3">
                No books yet
              </h3>
              <p className="text-amber-600 text-base md:text-lg max-w-md mx-auto">
                Start building your reading collection!
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header for when there are books */}
            <div className="text-center mb-6 md:mb-8 px-2">
              <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
                <Book className="w-6 h-6 md:w-8 md:h-8 text-amber-700" />
                <h1
                  className={`text-3xl md:text-5xl font-normal text-amber-900 ${alexBrush.className}`}
                >
                  Bookshelf
                </h1>
              </div>
              <p className="text-amber-700 text-base md:text-lg">
                Keep track of your literary journey
              </p>
            </div>

            {/* Add Book Button for when there are books */}
            <div className="flex justify-center mb-6 md:mb-8 px-4">
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 md:px-6 py-2 md:py-3 text-base md:text-lg shadow-lg w-full max-w-xs md:w-auto"
              >
                <Plus className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Add New Book
              </Button>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {books.map((book) => (
                <Card
                  key={book.id}
                  className="bg-gradient-to-br from-amber-25 to-orange-25 border-amber-200 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => openBookDetail(book)}
                >
                  <CardHeader className="pb-2 md:pb-3 p-3 md:p-6">
                    <CardTitle className="text-base md:text-lg font-bold text-amber-900 line-clamp-2 group-hover:text-amber-700 transition-colors">
                      {book.title}
                    </CardTitle>
                    <p className="text-sm md:text-base text-amber-700 font-medium">
                      by {book.author}
                    </p>
                  </CardHeader>
                  <CardContent className="p-3 md:p-6 pt-0">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <div className="flex gap-1">
                        {renderStars(book.rating)}
                      </div>
                      <span className="text-xs md:text-sm font-semibold text-amber-800">
                        {book.rating}/10
                      </span>
                    </div>
                    {book.comment && (
                      <p className="text-xs md:text-sm text-amber-600 line-clamp-2 mb-2 md:mb-3 break-words">
                        {book.comment}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-amber-500">
                        Added {book.dateAdded}
                      </span>
                      <div className="flex gap-1 md:gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditDialog(book);
                          }}
                          className="text-amber-600 hover:text-amber-800 hover:bg-amber-100 p-1 md:p-2"
                        >
                          <Edit className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteBook(book.id);
                          }}
                          className="text-red-600 hover:text-red-800 hover:bg-red-100 p-1 md:p-2"
                        >
                          <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Small illustration at bottom when there are books */}
            <div className="mt-8 md:mt-12 flex justify-center">
              <div className="w-24 h-20 md:w-32 md:h-24 opacity-60 flex items-center justify-center">
                <Image
                  src="/images/book-illustration.png"
                  alt="Vintage illustration of stacked books, an open book, and a quill pen with ink well"
                  width={128}
                  height={96}
                  className="w-full h-full object-contain"
                  style={{ objectPosition: "center" }}
                />
              </div>
            </div>
          </>
        )}

        {/* Dialogs */}
        <AddBookDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddBook={addBook}
        />

        {selectedBook && (
          <>
            <BookDetailDialog
              book={selectedBook}
              isOpen={isDetailDialogOpen}
              onClose={() => {
                setIsDetailDialogOpen(false);
                setSelectedBook(null);
              }}
              onEdit={() => {
                setIsDetailDialogOpen(false);
                setIsEditDialogOpen(true);
              }}
              onDelete={() => {
                deleteBook(selectedBook.id);
                setIsDetailDialogOpen(false);
                setSelectedBook(null);
              }}
            />

            <EditBookDialog
              book={selectedBook}
              isOpen={isEditDialogOpen}
              onClose={() => {
                setIsEditDialogOpen(false);
                setSelectedBook(null);
              }}
              onUpdateBook={updateBook}
            />
          </>
        )}
      </div>
    </div>
  );
}
