package com.dino.backend.shared.test.lazy;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class ab {

    @Id
    Long id;

    String name;

    @OneToOne(fetch = FetchType.LAZY) // LAZY true
    @JoinColumn(name = "aa_id")
    aa aa;
}
