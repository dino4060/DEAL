package dmon.SSHOP_springboot_backend.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AccountUpdateRequest {
    private String email;
    private String phone;
    private String password;
}
