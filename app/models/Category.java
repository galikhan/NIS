package models;

import java.util.*;

import javax.persistence.*;

import play.db.jpa.GenericModel;
import play.data.validation.*;

@Entity
@Table(name="NS_CATEGORY")
public class Category extends GenericModel {
	
	@Required
	@Id
	@Column(name="ID_")
	public Long id;
	
	@Required
	@Column(name="NAME_")
	public String name;
	
	@Required
	@Column(name="PARENT_ID_")
	public Long parentId;

    @OneToMany(mappedBy="categories", cascade=CascadeType.ALL)
    public List<Category> categories;
	
	@Required
	@Column(name="LEVEL_ID_")
	public Long levelId;

	@ManyToMany(mappedBy="categories")
	public List<Resource> resources = new ArrayList<Resource>();
	
	public String toString() {
	    return id + " - " + name;
	}
}
