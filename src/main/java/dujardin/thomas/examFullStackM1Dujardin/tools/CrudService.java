package dujardin.thomas.examFullStackM1Dujardin.tools;
import java.util.List;

public interface CrudService<Entity, ID> {
    Entity create(Entity entity);
    Entity get(ID id);
    List<Entity> getAll();
    Entity update(Entity entity, ID id);
    boolean delete(ID id);
    
}
