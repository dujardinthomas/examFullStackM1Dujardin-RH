package dujardin.thomas.examFullStackM1Dujardin.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Entity
@Data
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull
    @NotBlank(message = "Name cannot be blank")
    private String name;

    private String poste;
    private double salary;
    private LocalDate startContract;
    private LocalDate endContract;
    private String numberIdentification;
    private LocalDate birthDate;
    private String address;
    private String phoneNumber;
    private String comments;


    @NotNull
    @NotBlank(message = "Email cannot be blank")
    @Pattern(regexp = "^[^@\\s]+@[^@\\s]+\\.com$", message = "Email must end with .com")
    private String email;


    @OneToMany(mappedBy = "employe", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference
    private List<Conges> conges = new ArrayList<>();

    @ElementCollection
    private List<LocalDate> absences = new ArrayList<>();
}
