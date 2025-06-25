package dujardin.thomas.examFullStackM1Dujardin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dujardin.thomas.examFullStackM1Dujardin.exception.ObjectNotFoundException;
import dujardin.thomas.examFullStackM1Dujardin.model.Applicant;
import dujardin.thomas.examFullStackM1Dujardin.repository.ApplicantRepository;
import dujardin.thomas.examFullStackM1Dujardin.tools.CrudService;

@Service
public class ApplicantService implements CrudService<Applicant, Long> {

    @Autowired
    private ApplicantRepository applicantRepository;

    @Override
    public Applicant create(Applicant entity) {
        return applicantRepository.save(entity);
    }

    @Override
    public Applicant get(Long id) {
        return applicantRepository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Applicant not found with id: " + id));
    }

    @Override
    public List<Applicant> getAll() {
        return applicantRepository.findAll();
    }

    @Override
    public Applicant update(Applicant entity, Long id) {
        if (!applicantRepository.existsById(id)) {
            throw new ObjectNotFoundException("Applicant not found with id: " + id);
        }
        entity.setId(id);
        return applicantRepository.save(entity);
    }

    @Override
    public boolean delete(Long id) {
        if (!applicantRepository.existsById(id)) {
            throw new ObjectNotFoundException("Applicant not found with id: " + id);
        }
        applicantRepository.deleteById(id);
        return !applicantRepository.existsById(id);
    }


    
}
