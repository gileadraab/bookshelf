package com.bookshelf.ui;

import android.app.AlertDialog;
import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;

import com.bookshelf.R;
import com.bookshelf.model.Book;
import com.google.android.material.button.MaterialButton;

public class BookDetailDialog extends Dialog {
    private Book book;
    private OnBookActionListener listener;

    private TextView tvBookTitle;
    private TextView tvAuthor;
    private LinearLayout starsContainer;
    private TextView tvRating;
    private TextView tvComment;
    private TextView tvDateAdded;
    private MaterialButton btnEdit;
    private MaterialButton btnDelete;
    private ImageButton btnClose;

    public interface OnBookActionListener {
        void onEditClick(Book book);
        void onDeleteClick(Book book);
    }

    public BookDetailDialog(@NonNull Context context, Book book, OnBookActionListener listener) {
        super(context);
        this.book = book;
        this.listener = listener;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.dialog_book_detail);

        // Make dialog full screen
        WindowManager.LayoutParams params = getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = WindowManager.LayoutParams.MATCH_PARENT;
        getWindow().setAttributes(params);

        initViews();
        displayBookDetails();
        setupListeners();
    }

    private void initViews() {
        tvBookTitle = findViewById(R.id.tvBookTitle);
        tvAuthor = findViewById(R.id.tvAuthor);
        starsContainer = findViewById(R.id.starsContainer);
        tvRating = findViewById(R.id.tvRating);
        tvComment = findViewById(R.id.tvComment);
        tvDateAdded = findViewById(R.id.tvDateAdded);
        btnEdit = findViewById(R.id.btnEdit);
        btnDelete = findViewById(R.id.btnDelete);
        btnClose = findViewById(R.id.btnClose);
    }

    private void displayBookDetails() {
        tvBookTitle.setText(book.getTitle());
        tvAuthor.setText(getContext().getString(R.string.by_author, book.getAuthor()));
        tvRating.setText(getContext().getString(R.string.rating_format, book.getRating()));

        if (book.getComment() != null && !book.getComment().trim().isEmpty()) {
            tvComment.setText(book.getComment());
            tvComment.setVisibility(View.VISIBLE);
        } else {
            tvComment.setText("No comments");
            tvComment.setVisibility(View.VISIBLE);
        }

        tvDateAdded.setText(getContext().getString(R.string.added_date, book.getDateAdded()));

        displayStars(book.getRating());
    }

    private void displayStars(int rating) {
        starsContainer.removeAllViews();

        for (int i = 0; i < 10; i++) {
            ImageView star = new ImageView(getContext());
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    dpToPx(20), dpToPx(20)
            );
            params.setMargins(dpToPx(2), 0, dpToPx(2), 0);
            star.setLayoutParams(params);

            if (i < rating) {
                star.setImageResource(R.drawable.ic_star_filled);
            } else {
                star.setImageResource(R.drawable.ic_star_empty);
            }

            starsContainer.addView(star);
        }
    }

    private void setupListeners() {
        btnClose.setOnClickListener(v -> dismiss());

        btnEdit.setOnClickListener(v -> {
            listener.onEditClick(book);
            dismiss();
        });

        btnDelete.setOnClickListener(v -> showDeleteConfirmation());
    }

    private void showDeleteConfirmation() {
        new AlertDialog.Builder(getContext())
                .setTitle(R.string.delete_confirmation_title)
                .setMessage(R.string.delete_confirmation_message)
                .setPositiveButton(R.string.delete_confirm, (dialog, which) -> {
                    listener.onDeleteClick(book);
                    dismiss();
                })
                .setNegativeButton(R.string.cancel_button, null)
                .show();
    }

    private int dpToPx(int dp) {
        float density = getContext().getResources().getDisplayMetrics().density;
        return Math.round(dp * density);
    }
}
