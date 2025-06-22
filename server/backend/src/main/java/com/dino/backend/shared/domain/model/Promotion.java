package com.dino.backend.shared.domain.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public abstract class Promotion extends BaseEntity {

    @Column(nullable = false)
    String name;

    @Column(name = "start_date", nullable = false)
    Instant startDate;

    @Column(name = "end_date", nullable = false)
    Instant endDate;

    public boolean isPeriodActive() {
        // NOTE: isAfter, isBefore
        // isAfter, isBefore don't include equals => ()
        // !isBefore, !isAfter include equals => []
        Instant now = Instant.now();
        return !now.isBefore(this.startDate) && !now.isAfter(this.endDate);
    }
}
