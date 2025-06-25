package dujardin.thomas.examFullStackM1Dujardin.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Data
public class Applicant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @NotBlank(message = "Name cannot be blank")
    private String name;

    private String numberCardIdentity;
    private LocalDate birthDate;
    private String address;

    @NotNull
    @NotBlank(message = "Email cannot be blank")
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.com$", message = "Email must end with .com")
    private String email;

    private String phoneNumber;
    private int note;
    private String technicalDomain;
    private LocalDate dateInterview;

    private String comments;

}
