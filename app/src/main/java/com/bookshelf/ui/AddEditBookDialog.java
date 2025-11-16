package com.bookshelf.ui;

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
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.bookshelf.R;
import com.bookshelf.model.Book;
import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class AddEditBookDialog extends Dialog {
    private Book bookToEdit;
    private OnBookSavedListener listener;
    private int selectedRating = 0;

    private TextView tvDialogTitle;
    private TextInputEditText etBookTitle;
    private TextInputEditText etAuthor;
    private LinearLayout ratingStarsContainer;
    private TextView tvRatingSelected;
    private TextInputEditText etComment;
    private MaterialButton btnSave;
    private MaterialButton btnCancel;
    private ImageButton btnClose;

    public interface OnBookSavedListener {
        void onBookSaved(Book book);
    }

    public AddEditBookDialog(@NonNull Context context, Book bookToEdit, OnBookSavedListener listener) {
        super(context);
        this.bookToEdit = bookToEdit;
        this.listener = listener;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.dialog_add_edit_book);

        // Make dialog full screen
        WindowManager.LayoutParams params = getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = WindowManager.LayoutParams.MATCH_PARENT;
        getWindow().setAttributes(params);

        initViews();
        setupStarRating();
        setupListeners();

        // Set initial rating text
        tvRatingSelected.setText(getContext().getString(R.string.rating_selected, selectedRating));

        // If editing, populate fields
        if (bookToEdit != null) {
            populateFields();
        }
    }

    private void initViews() {
        tvDialogTitle = findViewById(R.id.tvDialogTitle);
        etBookTitle = findViewById(R.id.etBookTitle);
        etAuthor = findViewById(R.id.etAuthor);
        ratingStarsContainer = findViewById(R.id.ratingStarsContainer);
        tvRatingSelected = findViewById(R.id.tvRatingSelected);
        etComment = findViewById(R.id.etComment);
        btnSave = findViewById(R.id.btnSave);
        btnCancel = findViewById(R.id.btnCancel);
        btnClose = findViewById(R.id.btnClose);
    }

    private void setupStarRating() {
        ratingStarsContainer.removeAllViews();

        for (int i = 1; i <= 10; i++) {
            final int rating = i;
            ImageView star = new ImageView(getContext());
            LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                    dpToPx(24), dpToPx(24)
            );
            params.setMargins(dpToPx(2), 0, dpToPx(2), 0);
            star.setLayoutParams(params);
            star.setImageResource(R.drawable.ic_star_empty);
            star.setOnClickListener(v -> {
                selectedRating = rating;
                updateStarDisplay();
                tvRatingSelected.setText(getContext().getString(R.string.rating_selected, selectedRating));
            });

            ratingStarsContainer.addView(star);
        }
    }

    private void updateStarDisplay() {
        for (int i = 0; i < ratingStarsContainer.getChildCount(); i++) {
            ImageView star = (ImageView) ratingStarsContainer.getChildAt(i);
            if (i < selectedRating) {
                star.setImageResource(R.drawable.ic_star_filled);
            } else {
                star.setImageResource(R.drawable.ic_star_empty);
            }
        }
    }

    private void setupListeners() {
        btnClose.setOnClickListener(v -> dismiss());
        btnCancel.setOnClickListener(v -> dismiss());
        btnSave.setOnClickListener(v -> saveBook());
    }

    private void populateFields() {
        tvDialogTitle.setText(R.string.edit_book_title);
        btnSave.setText(R.string.save_changes_button);

        etBookTitle.setText(bookToEdit.getTitle());
        etAuthor.setText(bookToEdit.getAuthor());
        etComment.setText(bookToEdit.getComment());

        selectedRating = bookToEdit.getRating();
        updateStarDisplay();
        tvRatingSelected.setText(getContext().getString(R.string.rating_selected, selectedRating));
    }

    private void saveBook() {
        String title = etBookTitle.getText().toString().trim();
        String author = etAuthor.getText().toString().trim();
        String comment = etComment.getText().toString().trim();

        if (title.isEmpty()) {
            Toast.makeText(getContext(), R.string.error_title_required, Toast.LENGTH_SHORT).show();
            return;
        }

        if (author.isEmpty()) {
            Toast.makeText(getContext(), R.string.error_author_required, Toast.LENGTH_SHORT).show();
            return;
        }

        Book book;
        if (bookToEdit != null) {
            // Editing existing book
            book = bookToEdit;
            book.setTitle(title);
            book.setAuthor(author);
            book.setRating(selectedRating);
            book.setComment(comment);
        } else {
            // Adding new book
            String dateAdded = new SimpleDateFormat("M/d/yyyy", Locale.getDefault()).format(new Date());
            book = new Book(title, author, selectedRating, comment, dateAdded);
        }

        listener.onBookSaved(book);
        dismiss();
    }

    private int dpToPx(int dp) {
        float density = getContext().getResources().getDisplayMetrics().density;
        return Math.round(dp * density);
    }
}
