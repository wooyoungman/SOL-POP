package popz.solpop.repository;


import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Query;
import popz.solpop.entity.Member;

import java.util.Optional;

@Repository
@Transactional
public interface MemberRepository extends JpaRepository<Member, Integer> {

    boolean existsByUserName(String userName);
    boolean existsByUserId(String userId);

    @Query("SELECT member FROM Member member WHERE member.userName = :userName")
    Member findMemberByUserName(@Param("userName") String userName);

    @Query("SELECT member FROM Member member WHERE member.userId = :userId")
    Member findMemberByUserId(@Param("userId") String userId);

}