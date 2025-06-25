package dujardin.thomas.examFullStackM1Dujardin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dujardin.thomas.examFullStackM1Dujardin.model.Applicant;

@Repository
public interface ApplicantRepository extends JpaRepository<Applicant, Long> {
}
