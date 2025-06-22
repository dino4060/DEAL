package com.dino.backend.shared.domain.exception;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    // SUCCESS CODE: 1 //

    // INFRASTRUCTURE 1000+ //
    // COMMON //
    SYSTEM__UNHANDLED_EXCEPTION(1000, "Lỗi chưa được xử lý.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__DEVELOPING_FEATURE(1001, "The feature is still developing.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__VALIDATION_UNSUPPORTED(1003, "Validation is unsupported.", HttpStatus.INTERNAL_SERVER_ERROR),
    SYSTEM__METHOD_NOT_SUPPORTED(1004, "Method '%s' is not supported.", HttpStatus.BAD_REQUEST),
    SYSTEM__ROUTE_NOT_SUPPORTED(1005, "Route '%s' not supported.", HttpStatus.BAD_REQUEST),
    SYSTEM__BODY_REQUIRED(1006, "Body is required.", HttpStatus.BAD_REQUEST),
    SYSTEM__ID_INVALID(1006, "Id is invalid.", HttpStatus.BAD_REQUEST),
    // SECURITY //
    SECURITY__UNAUTHENTICATED(1010, "Resources are protected.", HttpStatus.UNAUTHORIZED),
    SECURITY__UNAUTHORIZED(1011, "Resources are forbidden.", HttpStatus.FORBIDDEN),
    SECURITY__GET_CURRENT_USER_FAILED(1012, "Lấy người dùng hiện tại thất bại.", HttpStatus.INTERNAL_SERVER_ERROR),
    SECURITY__GEN_TOKEN_FAILED(1013, "Tạo token thất bại", HttpStatus.INTERNAL_SERVER_ERROR),
    // OAUTH2 //
    OAUTH2__GET_GOOGLE_TOKEN_FAILED(1020, "Lấy access token của Google thất bại.",
            HttpStatus.INTERNAL_SERVER_ERROR),
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

    // IDENTITY 1100+ //
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
    // SKU //
    SKU__FIND_FAILED(1220, "Lấy SKU thất bại.", HttpStatus.INTERNAL_SERVER_ERROR),
    SKU__TIER_OPTION_INDEXES_INVALID(1221, "tierOptionIndexes không hợp lệ.", HttpStatus.BAD_REQUEST),
    SKU__INSUFFICIENT_STOCK(1222, "Không đủ tồn kho", HttpStatus.BAD_REQUEST),

    // USER PROFILE 1300+ //
    // ADDRESS //
    ADDRESS__NOT_FOUND(1300, "Không tìm thấy địa chỉ.", HttpStatus.BAD_REQUEST),

    // PROMOTION 1400+ //
    // DISCOUNT //
    DISCOUNT__NOT_FOUND(1400, "Không tìm thấy sản phẩm được giảm giá.", HttpStatus.BAD_REQUEST),

    // ORDERING 1500+ //
    // CART //
    CART__NOT_FOUND(1501, "Không tìm thấy giỏ hàng", HttpStatus.BAD_REQUEST),
    CART__ITEM_NOT_FOUND(1502, "Không tìm thấy mặt hàng trong giỏ", HttpStatus.BAD_REQUEST),
    CART__QUANTITY_MIN_INVALID(1503, "Số lượng tối thiểu là 1", HttpStatus.BAD_REQUEST),
    CART__QUANTITY_MAX_INVALID(1504, "Số lượng tối đa là 100", HttpStatus.BAD_REQUEST),
    CART__SKU_EMPTY(1505, "Vui lòng chọn mặt hàng", HttpStatus.BAD_REQUEST),
    CART__TOTAL_MIN_INVALID(1506, "Giỏ hàng đã có 0 sản phẩm", HttpStatus.BAD_REQUEST),
    CART__TOTAL_MAX_INVALID(1507, "Giỏ hàng đã có 100 sản phẩm", HttpStatus.BAD_REQUEST),
    CART__IS_DELETED(1508, "Giỏ hàng đã bị xóa", HttpStatus.BAD_REQUEST),
    CART__ITEMS_EMPTY(1509, "Vui lòng chọn mặt hàng", HttpStatus.BAD_REQUEST),
    // ORDER //
    ORDER__ORDERS_EMPTY(1510, "Vui lòng chọn đơn hàng", HttpStatus.BAD_REQUEST),
    ORDER__NOT_FOUND(1511, "Không tìm thấy đơn hàng", HttpStatus.BAD_REQUEST),
    ORDER__QUANTITY_UNDER_MIN(1512, "Số lượng tối thiểu là 1", HttpStatus.BAD_REQUEST),
    ORDER__QUANTITY_OVER_MAX(1513, "Số lượng tối đa là 100", HttpStatus.BAD_REQUEST),
    ORDER__STATUS_NOT_UPDATABLE(1514, "Trạng thái hiện tại không cho phép chỉnh sửa", HttpStatus.BAD_REQUEST),
    ORDER__MAIN_PRICE_INVALID(1515, "Giá chính không nên nhỏ hơn 1000 VNĐ hoặc nhỏ hơn giá phụ", HttpStatus.BAD_REQUEST),
    ORDER__SIDE_PRICE_INVALID(1516, "Giá phụ không nên nhỏ hơn 0 VNĐ hoặc lớn hơn giá chính", HttpStatus.BAD_REQUEST),
    ORDER__MAX_ESTIMATE_DAY_INVALID(1518, "Ngày dự kiến tối đa không nên nhỏ hơn ngày hiện tại hoặc ngày tối thiểu", HttpStatus.BAD_REQUEST),
    ORDER__MIN_ESTIMATE_DAY_INVALID(1519, "Ngày dự kiến tối thiểu không nên nhỏ hơn ngày hiện tại hoặc lớn hơn tối đa", HttpStatus.BAD_REQUEST),

    // INVENTORY 1600+ //
    // INVENTORY //
    INVENTORY__NOT_FOUND(1600, "Không tìm thấy kho hàng", HttpStatus.BAD_REQUEST),
    INVENTORY__STOCKS_UNDER_MIN(1600, "Số lượng tồn kho nên lớn hơn 0", HttpStatus.BAD_REQUEST),
    INVENTORY__SALES_UNDER_MIN(1600, "Số lượng đã bán nên lớn hơn 0", HttpStatus.BAD_REQUEST),

    ;

    int code;
    String message;
    HttpStatusCode status;

    public static Optional<ErrorCode> safeValueOf(String name) {
        try {
            return Optional.of(ErrorCode.valueOf(name));
        } catch (IllegalArgumentException | NullPointerException e) {
            return Optional.empty();
        }
    }
}
