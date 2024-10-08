package popz.solpop.controller;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import popz.solpop.dto.MemberId;
import popz.solpop.entity.*;
import popz.solpop.security.TokenProvider;
import popz.solpop.service.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
public class MemberController {

    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private ReservationService reservationService;
    @Autowired
    private HeartService heartService;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private MemberService memberService;
    @Autowired
    private PointService pointService;
    @Autowired
    private EnterRaffleService enterRaffleService;

    @GetMapping("/reservation")
    public List<Reservation.MyReservation> getMyReservation(
            @RequestHeader("Authorization") String token
    ) {

        String userName = tokenProvider.getUserName(token.substring(7));
        Member member = memberService.getMemberByUserName(userName);
        return reservationService.getMyReservations(member.getMemId());
    }
    @GetMapping("/heart")
    public List<Heart.MyHeart> getMyHeart(
            @RequestHeader("Authorization") String token
    ) {

        String userName = tokenProvider.getUserName(token.substring(7));
        Member member = memberService.getMemberByUserName(userName);
        return heartService.getMyHeart(member.getMemId());
    }


    @GetMapping("/enterRaffle")
    public List<EnterRaffle.MyRaffle> getMyRaffle(
            @RequestHeader("Authorization") String token
    ) {

        String userName = tokenProvider.getUserName(token.substring(7));
        Member member = memberService.getMemberByUserName(userName);
        return enterRaffleService.getMyRaffles(member.getMemId());
    }

    @GetMapping("/point/balance")
    public Integer getMyPointBalance(
            @RequestHeader("Authorization") String token
    ) {

        String userName = tokenProvider.getUserName(token.substring(7));
        Member member = memberService.getMemberByUserName(userName);
        return member.getPointBalance();
    }

    @GetMapping("/point/usageHistory")
    public List<Point> getMyPointUsageHistory(
            @RequestHeader("Authorization") String token
    ) {

        String userName = tokenProvider.getUserName(token.substring(7));
        Member member = memberService.getMemberByUserName(userName);

        return pointService.getMyPointUsageHistory(member.getMemId());
    }

    @DeleteMapping("/cancelReservation")
    public ResponseEntity<?> cancelReservation(
            @RequestBody Map<String, Integer> reserveIdMap
    ) {

        reservationService.deleteReservation(reserveIdMap.get("reserveId"));
        return ResponseEntity.ok().build();
    }




}
