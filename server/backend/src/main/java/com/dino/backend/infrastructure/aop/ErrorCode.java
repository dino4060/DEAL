package com.dino.backend.infrastructure.aop;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    // SUCCESS CODE: 1 //

    // INFRASTRUCTURE CONTEXT 1000+ //
    // COMMON //
    SYSTEM__UNHANDLED_EXCEPTION(1000, "Lỗi chưa được xử lý.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__DEVELOPING_FEATURE(1001, "The feature is still developing.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__UNIMPLEMENTED_FEATURE(1002, "The feature is still developing.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__KEY_UNSUPPORTED(1003, "The key is unsupported.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__METHOD_NOT_SUPPORTED(1004, "Method '%s' is not supported.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__ROUTE_NOT_SUPPORTED(1005, "Route '%s' not supported.", HttpStatus.INTERNAL_SERVER_ERROR),
    // SECURITY //
    SECURITY__UNAUTHENTICATED(1010, "Resources are protected.", HttpStatus.UNAUTHORIZED),
    SECURITY__UNAUTHORIZED(1011, "Resources are forbidden.", HttpStatus.FORBIDDEN),
    SECURITY__GET_CURRENT_USER_FAILED(1012, "Lấy người dùng hiện tại thất bại.", HttpStatus.INTERNAL_SERVER_ERROR),
    SECURITY__GEN_TOKEN_FAILED(1013, "Tạo token thất bại", HttpStatus.INTERNAL_SERVER_ERROR),
    // OAUTH2 //
    OAUTH2__GET_GOOGLE_TOKEN_FAILED(1020, "Lấy access token của Google thất bại.", HttpStatus.INTERNAL_SERVER_ERROR),
    OAUTH2__GET_GOOGLE_USER_FAILED(1021, "Lấy thông tin người dùng của Google thất bại.",
            HttpStatus.INTERNAL_SERVER_ERROR),
    // FILES //
    FILE__FILE_OUT_EXTENSIONS(1030, "File extensions should be pdf, jpg, jpeg, png, doc or docx.",
            HttpStatus.BAD_REQUEST),
    FILE__FILE_CREATE_DIRECTORY(1031, "An error occurred while creating a media directory.",
            HttpStatus.INTERNAL_SERVER_ERROR),
    FILE__FILE_CREATE_FOLDER(1032, "An error occurred while creating a media folder.",
            HttpStatus.INTERNAL_SERVER_ERROR),
    FILE__FILE_CREATE_PATH(1033, "An error occurred while creating a file path.", HttpStatus.INTERNAL_SERVER_ERROR),
    FILE__FILE_STREAM(1034, "An error occurred while stream the file.", HttpStatus.INTERNAL_SERVER_ERROR),
    FILE__FILE_EMPTY(1035, "File is empty. Please upload a file.", HttpStatus.BAD_REQUEST),

    // IDENTITY CONTEXT 1100+ //
    // USER //
    USER__FIND_FAILED(1100, "Lấy người dùng thất bại", HttpStatus.INTERNAL_SERVER_ERROR),
    // TOKEN //
    TOKEN__FIND_FAILED(1110, "Lấy token thất bại.", HttpStatus.INTERNAL_SERVER_ERROR),
    TOKEN__UPDATE_FAILED(1111, "Cập nhật token thất bại.", HttpStatus.INTERNAL_SERVER_ERROR),
    // AUTH //
    AUTH__IDENTIFIER_REQUIRED(1120, "Email nên được cung cấp.", HttpStatus.BAD_REQUEST),
    AUTH__IDENTIFIER_NOT_FOUND(1121, "Email không tìm thấy.", HttpStatus.BAD_REQUEST),
    AUTH__IDENTIFIER_EXISTED(1122, "Email đã tồn tại.", HttpStatus.BAD_REQUEST),
    AUTH__PASSWORD_INVALID(1123, "Password không hợp lệ.", HttpStatus.BAD_REQUEST),
    AUTH__PASSWORD_MIN(1124, "Password nên có ít nhất 6 kí tự.", HttpStatus.BAD_REQUEST),
    AUTH__EMAIL_NOT_MATCHED(1125, "Email nên đúng định dạng.", HttpStatus.BAD_REQUEST),
    // AUTH__REFRESH_TOKEN_INVALID(1217, "Refresh token thì rỗng, trái phép, hoặc bị
    // đánh cấp.", HttpStatus.BAD_REQUEST),

    // PRODUCT CATALOG 1200+ //
    // PRODUCT //
    PRODUCT__NOT_FOUND(1200, "Không tìm thấy sản phẩm.", HttpStatus.BAD_REQUEST),
    // CATEGORY //
    CATEGORY__NOT_FOUND(1210, "Không tìm thấy ngành hàng.", HttpStatus.BAD_REQUEST),

    // USER PROFILE 1300+ //
    // ADDRESS //
    ADDRESS__NOT_FOUND(1300, "Không tìm thấy địa chỉ.", HttpStatus.BAD_REQUEST),

    // PROMOTION CONTEXT 1400+ //
    // DISCOUNTED PRODUCT //
    DISCOUNTED_PRODUCT__NOT_FOUND(1400, "Không tìm thấy sản phẩm được giảm giá.", HttpStatus.BAD_REQUEST);

    int code;
    String message;
    HttpStatusCode status;
}
