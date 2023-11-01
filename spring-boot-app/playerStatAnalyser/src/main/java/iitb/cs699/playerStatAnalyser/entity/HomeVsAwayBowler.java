package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="home_vs_away_bowler")
public class HomeVsAwayBowler {
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int row_id;	
	public int p_id;
	public String venue;
	public String inns;
	public String overs;
	public String mdns;
	public String runs;
	public String wkts;
	public String ave;
	public String econ;
	public String sr;
	


}
