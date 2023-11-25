package iitb.cs699.playerStatAnalyser.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="vs_country_batsman")
public class VsCountryBatsman {
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private int row_id;	
	
	@Column(name ="p_id")
	public int pId;
	
	public String country;
	
	public String inns;
	
	public String runs;
	
	public String hs;
	
	public String ave;
	
	public String sr;



}
