package com.bookshelf.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.bookshelf.R;
import com.bookshelf.model.Book;

import java.util.ArrayList;
import java.util.List;

public class BookAdapter extends RecyclerView.Adapter<BookAdapter.BookViewHolder> {
    private List<Book> books;
    private Context context;
    private OnBookClickListener listener;

    public interface OnBookClickListener {
        void onBookClick(Book book);
        void onEditClick(Book book);
        void onDeleteClick(Book book);
    }

    public BookAdapter(Context context, OnBookClickListener listener) {
        this.context = context;
        this.books = new ArrayList<>();
        this.listener = listener;
    }

    @NonNull
    @Override
    public BookViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(context).inflate(R.layout.item_book_card, parent, false);
        return new BookViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull BookViewHolder holder, int position) {
        Book book = books.get(position);
        holder.bind(book);
    }

    @Override
    public int getItemCount() {
        return books.size();
    }

    public void setBooks(List<Book> books) {
        this.books = books;
        notifyDataSetChanged();
    }

    public void removeBook(int position) {
        books.remove(position);
        notifyItemRemoved(position);
    }

    class BookViewHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        TextView tvBookTitle;
        TextView tvAuthor;
        LinearLayout starsContainer;
        TextView tvRating;
        TextView tvComment;
        TextView tvDateAdded;
        ImageButton btnEdit;
        ImageButton btnDelete;

        public BookViewHolder(@NonNull View itemView) {
            super(itemView);
            cardView = itemView.findViewById(R.id.cardView);
            tvBookTitle = itemView.findViewById(R.id.tvBookTitle);
            tvAuthor = itemView.findViewById(R.id.tvAuthor);
            starsContainer = itemView.findViewById(R.id.starsContainer);
            tvRating = itemView.findViewById(R.id.tvRating);
            tvComment = itemView.findViewById(R.id.tvComment);
            tvDateAdded = itemView.findViewById(R.id.tvDateAdded);
            btnEdit = itemView.findViewById(R.id.btnEdit);
            btnDelete = itemView.findViewById(R.id.btnDelete);
        }

        public void bind(Book book) {
            tvBookTitle.setText(book.getTitle());
            tvAuthor.setText(context.getString(R.string.by_author, book.getAuthor()));
            tvRating.setText(context.getString(R.string.rating_format, book.getRating()));

            // Handle comment visibility
            if (book.getComment() != null && !book.getComment().trim().isEmpty()) {
                tvComment.setText(book.getComment());
                tvComment.setVisibility(View.VISIBLE);
            } else {
                tvComment.setVisibility(View.GONE);
            }

            tvDateAdded.setText(context.getString(R.string.added_date, book.getDateAdded()));

            // Display stars
            displayStars(book.getRating());

            // Click listeners
            cardView.setOnClickListener(v -> listener.onBookClick(book));
            btnEdit.setOnClickListener(v -> listener.onEditClick(book));
            btnDelete.setOnClickListener(v -> listener.onDeleteClick(book));
        }

        private void displayStars(int rating) {
            starsContainer.removeAllViews();

            for (int i = 0; i < 10; i++) {
                ImageView star = new ImageView(context);
                LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                        dpToPx(12), dpToPx(12)
                );
                params.setMargins(dpToPx(1), 0, dpToPx(1), 0);
                star.setLayoutParams(params);

                if (i < rating) {
                    star.setImageResource(R.drawable.ic_star_filled);
                } else {
                    star.setImageResource(R.drawable.ic_star_empty);
                }

                starsContainer.addView(star);
            }
        }

        private int dpToPx(int dp) {
            float density = context.getResources().getDisplayMetrics().density;
            return Math.round(dp * density);
        }
    }
}
