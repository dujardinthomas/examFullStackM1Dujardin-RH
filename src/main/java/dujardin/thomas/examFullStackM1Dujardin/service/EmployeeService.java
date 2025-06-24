package dujardin.thomas.examFullStackM1Dujardin.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dujardin.thomas.examFullStackM1Dujardin.exception.ObjectNotFoundException;
import dujardin.thomas.examFullStackM1Dujardin.model.Employee;
import dujardin.thomas.examFullStackM1Dujardin.repository.EmployeeRepository;
import dujardin.thomas.examFullStackM1Dujardin.tools.CrudService;

@Service
public class EmployeeService implements CrudService<Employee, Long> {

    @Autowired
    private EmployeeRepository employeeRepository;
    
    @Override
    public Employee create(Employee entity) {
        return employeeRepository.save(entity);
    }

    @Override
    public Employee get(Long id) {
        return employeeRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Employee not found with id: " + id));
    }

    @Override
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee update(Employee entity, Long id) {
        Employee existingEmployee = employeeRepository.findById(id).orElse(null);
        if (existingEmployee == null) throw new ObjectNotFoundException("Employee not update because not found with id: " + id);
        existingEmployee.setName(entity.getName());
        existingEmployee.setEmail(entity.getEmail());
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return updatedEmployee;
    }

    @Override
    public boolean delete(Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ObjectNotFoundException("Employee not delete because not found with id: " + id);
        }
        employeeRepository.deleteById(id);
        return !employeeRepository.existsById(id);
    }

}
