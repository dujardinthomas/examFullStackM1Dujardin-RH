package dujardin.thomas.examFullStackM1Dujardin.model;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Data
public class Conges {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employe_id", nullable = false)
    @JsonBackReference
    @NotNull
    private Employee employe;
    
    @Column(name = "date_debut", nullable = false)
    @NotNull
    private LocalDate dateDebut;
    
    @Column(name = "date_fin", nullable = false)
    @NotNull
    private LocalDate dateFin;

}