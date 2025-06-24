package dujardin.thomas.examFullStackM1Dujardin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import dujardin.thomas.examFullStackM1Dujardin.model.Employee;

@Repository

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
