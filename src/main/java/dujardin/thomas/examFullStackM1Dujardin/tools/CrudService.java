package dujardin.thomas.examFullStackM1Dujardin.tools;
import java.util.List;

public interface CrudService<Entity, ID> {
    Entity create(Entity dto);
    Entity get(ID id);
    List<Entity> getAll();
    Entity update(Entity dto, ID id);
    boolean delete(ID id);
    
}
