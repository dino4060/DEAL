package com.dino.backend.features.product.application.service;

import com.dino.backend.features.product.domain.model.CategoryProjection;
import com.dino.backend.features.product.domain.Category;

import java.util.List;

public interface ICategoryService {
    // READ //
    List<CategoryProjection> getList();

    List<Category> getTree();
}
