package com.dino.backend.shared.domain.model;

import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@MappedSuperclass
@SuperBuilder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BaseEntity {

    @CreationTimestamp
    Instant createdAt;


    @UpdateTimestamp
    Instant updatedAt;

    Boolean isDeleted;

    @PrePersist
    public void beforeCreate() {
        this.isDeleted = Boolean.FALSE;
    }

    @PreUpdate
    public void beforeUpdate() {
    }

//    @JsonIgnore
//    public Instant getCreatedAt() {
//        return createdAt;
//    }
//
//    @JsonIgnore
//    public Instant getUpdatedAt() {
//        return updatedAt;
//    }
//
//    @JsonIgnore
//    public Boolean getDeleted() {
//        return isDeleted;
//    }
}
