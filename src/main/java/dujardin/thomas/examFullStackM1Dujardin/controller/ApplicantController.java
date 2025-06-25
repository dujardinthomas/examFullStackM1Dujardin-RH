package dujardin.thomas.examFullStackM1Dujardin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dujardin.thomas.examFullStackM1Dujardin.model.Applicant;
import dujardin.thomas.examFullStackM1Dujardin.service.ApplicantService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applicants")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicantController {

    @Autowired
    private ApplicantService applicantService;

    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<Applicant> applicant = applicantService.getAll();
            if (applicant.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No applicant found");
            }
            return ResponseEntity.ok(applicant);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetch all applicant");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(applicantService.get(id));
    }    
    
    
    @PostMapping
    public ResponseEntity<Object> createApplicant(@Valid @RequestBody Applicant user) {
        Applicant createdApplicant = applicantService.create(user);
        if (createdApplicant == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Applicant creation failed");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdApplicant);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateApplicant(@PathVariable Long id, @RequestBody Applicant userDto) {
        Applicant updatedUser = applicantService.update(userDto, id);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Applicant update failed");
        }
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteApplicant(@PathVariable Long id) {
        boolean res = applicantService.delete(id);
        if (res == false) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Applicant not found with id: " + id);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
