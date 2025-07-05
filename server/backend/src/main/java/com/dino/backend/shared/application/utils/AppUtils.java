package com.dino.backend.shared.application.utils;

import com.github.slugify.Slugify;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Collection;
import java.util.Objects;
import java.util.UUID;

public class AppUtils {

    public static boolean nonNull(Object object) {
        return Objects.nonNull(object);
    }

    public static boolean isNull(Object object) {
        return Objects.isNull(object);
    }

    public static boolean isBlank(String string) {
        return !StringUtils.hasText(string);
    }

    public static boolean isEmpty(Collection<Object> collection) {
        return CollectionUtils.isEmpty(collection);
    }

    public static Pageable defaultPageable() {
        return PageRequest.of(0, 10,
                Sort.by(Sort.Direction.DESC, "id"));
    }

    public static String maskMiddle(String plainText, int keptLength) {
        if (isEmpty(plainText))
            return plainText;
        // the non-masked text
        int maskEndIndex = plainText.length() - keptLength;
        String startText = plainText.substring(0, keptLength);
        String endText = plainText.substring(maskEndIndex);
        // the masked text
        String middleText = new String(new char[maskEndIndex - keptLength]).replace('\0', '*');
        return startText + middleText + endText;
    }

    public static String maskStart(String plainText, int keptLength) {
        if (isEmpty(plainText))
            return plainText;
        // the non-masked text
        int maskEndIndex = plainText.length() - keptLength;
        String endText = plainText.substring(maskEndIndex);
        // the masked text
        String startText = new String(new char[endText.length()]).replace('\0', '*');
        return startText + endText;
    }

    /**
     * @param value: Object
     * @return true if non-null, false if null
     * @desc check a value object is present
     */
    public static boolean isPresent(Object value) {
        return value != null;
    }

    /**
     * @param value: Object
     * @return true if null, false if non-null
     * @desc check a value object is empty
     */
    public static boolean isEmpty(Object value) {
        return value == null;
    }

    public static String genUUID() {
        UUID uuid = UUID.randomUUID();
        return uuid.toString();
    }

    public static String toSlug(String name) {
        Slugify slugify = Slugify.builder().build();
        return slugify.slugify(name);
    }

    /**
     * Map source to target with ignoring null value to update partially.
     *
     * @param target Entity will be updated
     * @param source Entity is requested
     * @throws IllegalAccessException when can not access any fields
     */
    public static <T> void updateNonNull(T target, T source) {
        // Get fields (attributes) of source or target
        Field[] fields = source.getClass().getDeclaredFields();

        // Iterate through fields
        Arrays.stream(fields).parallel()
                .peek(field -> field.setAccessible(true)) // Allow to access the private fields
                .filter(field -> {
                    try {
                        return field.get(source) != null; // Select non-null fields
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                })
                .forEach(field -> {
                    try {
                        field.set(target, field.get(source)); // Map source to target
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                });
    }
}
