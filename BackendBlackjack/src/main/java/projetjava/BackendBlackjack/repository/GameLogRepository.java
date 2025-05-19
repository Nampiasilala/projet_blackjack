package projetjava.BackendBlackjack.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import projetjava.BackendBlackjack.model.GameLog;

import java.util.List;

public interface GameLogRepository extends JpaRepository<GameLog, Long> {
    List<GameLog> findByUtilisateur_Id(Long userId); // CORRECT
}

