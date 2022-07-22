package nondZoo;

import java.util.ArrayList;
import java.util.Collections;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins="http://localhost:3000")
public class ZooIndexController {

    private static final String GREETING_MESSAGE = "Welcome to NOND Zoo!";
    private static final String GOODBYE_MESSAGE = "Thank you for visiting Nond Zoo!";
    private static final int ANIMAL_TOTAL = 5;
    
    public static ArrayList<Animal> animals = getDefaultAnimals();
    
    
    /**
     * Gets the base animals who will always be in the zoo
     * 
     * @return      The ArrayList containing the animals
     */
    public static ArrayList<Animal> getDefaultAnimals() {
    	ArrayList<Animal> baseAnimals = new ArrayList<Animal>();
    	baseAnimals.add(new BlackPanther("Blacky"));
    	baseAnimals.add(new ElephantBird("Birdy"));
    	baseAnimals.add(new Griffin("Finn"));
    	baseAnimals.add(new Glyptodon("Peter"));
    	return baseAnimals;
    }

    /**
     * Adds a new Animal to our animal list
     * 
     * @param className    The type of the animal we want to add
     * @param animalName   The name of the new animal we are adding
     */
	public static Animal AddAnimal(String className, String animalName) {
    	String myPackage = "nondZoo";
        Class[] cArg = new Class[1];
        cArg[0] = String.class;

        String fullClass = myPackage + "." + className.replace(" ", "");
        try {
            Class<?> animalClass = Class.forName(fullClass);
            Object obj = animalClass.getDeclaredConstructor(cArg).newInstance(animalName);
            animals.add((Animal)obj);
            return (Animal)obj;
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return null;
    }
	
	/**
     * Delete an animal from out animal list since it is not in the zoo anymore
     * 
     * @param animalName   The name of the animal we want to delete
     */
	public static void DeleteAnimal(String animalName) {
		for(int i=0; i< animals.size(); i++) {
			if(animals.get(i).name.equals(animalName)) {
				animals.remove(i);
			}
		}
	}
	
	/**
     * Sorts our animals by alphabetical order
     * 
     */
	public static ArrayList<Animal> SortAnimals(String sortType) {
		 ArrayList<Animal> sorted = new ArrayList<Animal>(animals);
		 sorted.sort((a1, a2)
					 -> a1.getName().compareTo(
							 a2.getName()));			 
		 if(sortType.equals("reversed")) {
			 Collections.reverse(sorted);
		 }
		 return sorted;
	}
	
	
	/**
     * Search the animals who match the search string by name
     * 
     * @param searchString	the input the user has searched
     * @return 	list of animals who was the searched string in their name
     */
	public static ArrayList<Animal> SearchAnimalByName(String searchString) {
		ArrayList<Animal> matchedAnimals = new ArrayList<Animal>();
		String regex = "^.*" + searchString + ".*$";
		for(int i=0; i< animals.size(); i++) {
			if(animals.get(i).getName().matches(regex)) {
				matchedAnimals.add(animals.get(i));
			}
		}
		return matchedAnimals;
	}
	
	
	/**
     * Clones an animal and created a new copy of it 
     * 
     * @param animalName	The name of the animal we want to clone
     */
	public static void CloneAnimal(String animalName) {
		Animal clonedAnimal = null;
		for(int i=0; i< animals.size(); i++) {
			if(animals.get(i).name.equals(animalName)) {
				try {
					clonedAnimal = (Animal)animals.get(i).clone();
					break;
				} catch (CloneNotSupportedException e) {
					e.printStackTrace();
				}
			}
		}
		if(clonedAnimal != null) {			
			animals.add(clonedAnimal);
		}
	}
	
	@GetMapping(path = "/animals")
    public ArrayList<Animal> getAllAnimals() {
		return animals;
    }
	
	@GetMapping("/animals/sorted")
    public ArrayList<Animal> getSortedAnimals() {
		return SortAnimals("regular");
    }

    @GetMapping("/animals/reverse-sorted")
    public ArrayList<Animal> getSortedAnimalsReversed() {
        return SortAnimals("reversed");
    }
	
	@PostMapping("/animal")
	public Animal AddAnimal(
		@RequestBody AnimalAddRequestModel animalModel) {
		return AddAnimal(animalModel.getAnimalType(), animalModel.getName());
	}
	
	@DeleteMapping("/animal")
	public void DeleteAnimalByName(
		@RequestParam(name = "name", required = true) String animalName) {
		DeleteAnimal(animalName);
	}
	
	@GetMapping("animals/search")
	public ArrayList<Animal> getAnimalsBySearchInput(
		@RequestParam(name = "searchInput", defaultValue = "") String searchInput) {
		return SearchAnimalByName(searchInput);
	}
	
	@PostMapping("animals/clone")
	public void cloneAnimal(
		@RequestBody AnimalCloneRequestModel animalModel) {
		CloneAnimal(animalModel.getName());
	}
}
