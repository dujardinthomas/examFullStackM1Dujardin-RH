package dujardin.thomas.examFullStackM1Dujardin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dujardin.thomas.examFullStackM1Dujardin.model.Employee;
import dujardin.thomas.examFullStackM1Dujardin.service.EmployeeService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public ResponseEntity<Object> getAllUsers() {
        try {
            List<Employee> employee = employeeService.getAll();
            if (employee.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No employee found");
            }
            return ResponseEntity.ok(employee);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error fetch all employee");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.get(id));
    }    
    
    
    @PostMapping
    public ResponseEntity<Object> createEmployee(@Valid @RequestBody Employee user) {
        Employee createdEmployee = employeeService.create(user);
        if (createdEmployee == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Employee creation failed");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEmployee);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateEmployee(@PathVariable Long id, @RequestBody Employee userDto) {
        Employee updatedUser = employeeService.update(userDto, id);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Employee update failed");
        }
        return ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteEmployee(@PathVariable Long id) {
        boolean res = employeeService.delete(id);
        if (res == false) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Employee not found with id: " + id);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
