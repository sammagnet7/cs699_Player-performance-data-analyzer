package iitb.cs699.playerStatAnalyser;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="vs_country_batsman")
public class VsCountryBatsman {
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int row_id;	
	public int p_id;
	public String country;
	public String inns;
	public String runs;
	public String hs;
	public String ave;
	public String sr;
	
	
	@Override
	public String toString() {
		return "VsCountryBatsman [row_id=" + row_id + ", p_id=" + p_id + ", country=" + country + ", inns=" + inns
				+ ", runs=" + runs + ", hs=" + hs + ", ave=" + ave + ", sr=" + sr + "]";
	}
	
	




}
