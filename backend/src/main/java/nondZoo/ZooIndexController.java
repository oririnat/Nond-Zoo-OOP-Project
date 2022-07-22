package nondZoo;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.util.ResourceUtils;

/**
 * Controller that handles the default request ("/").
 *
 * Use the new Java 15 text blocks to provide our menu. Thymeleaf:
 * https://spring.io/guides/gs/serving-web-content/
 *
 */
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
     * Prints our animals names
     *
     */
	public static void PrintAllAnimals() {
		for(int i=0; i< animals.size(); i++) {
			System.out.println(animals.get(i).getName() + " - " + animals.get(i).getClass().getSimpleName());
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
	
	@GetMapping("/sortedAnimals")
    public ArrayList<Animal> getSortedAnimals(
    	@RequestParam(name = "sort", defaultValue = "sort") String sortType) {
		return SortAnimals(sortType);
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
	
    /**
     * Map GET request to "/" to index().
     *
     * @return filename from src/main/resources/templates folder
     */
    @GetMapping(path = "/")
    public String index(
            @RequestParam(name = "id", required = false, defaultValue = "0") String idParam,
            Model model) {
        model.addAttribute("id", idParam);
        model.addAttribute("greeting", GREETING_MESSAGE);
        return "index";
    }

    /**
     * Map GET request to "/employee" to employee().
     *
     * @param typeParam - the type of person provided in the URL
     * @param model - the model that holds info from controller to view
     * @return filename from src/main/resources/templates folder
     */
    @GetMapping(path = "/employee")
    public String employee(
        @RequestParam(name = "employeeType", required = true) String typeParam, Model model) {
        model.addAttribute("type", typeParam);
        model.addAttribute("employeeName", getEmployeeName(typeParam));
        model.addAttribute("employeeDescription", getEmployeeDescription(typeParam));
        model.addAttribute("employeeDetails", getEmployeeDetails(typeParam));
        model.addAttribute("employeeAnimals", getEmployeeAnimals(typeParam));
        return "employee";
    }

    /**
     * Map GET request to "/visitor" to visitor().
     *
     * @param visitorTypeParam - the type of person provided in the URL
     * @param idParam
     * @param model - the model that holds info from controller to view
     * @return filename from src/main/resources/templates folder
     * @throws java.io.FileNotFoundException
     */
    @GetMapping(path = "/visitor")
    public String visitor(
        @RequestParam(name = "visitorType", required = false, defaultValue = "guest") String visitorTypeParam,
        @RequestParam(name = "id", required = false, defaultValue = "0") String idParam, Model model) throws FileNotFoundException {
        model.addAttribute("id", idParam);
        model.addAttribute("type", visitorTypeParam);
        model.addAttribute("payment", getVisitorPayment(visitorTypeParam));
        model.addAttribute("animalMap", getAllAnimalMap());
        model.addAttribute("animalOutput", getAnimalOutput(idParam));
        model.addAttribute("animalImage", getAnimalImageLink(idParam));
        return "visitor";
    }

    /**
     * Dynamically calls an Animal's run() function by class name
     * 
     * @param className     The name of the Animal Class we want
     * @param animalName    The animal's name required in its constructor
     */
    private static void callAnimalRun(String className, String animalName) {
        String myPackage = "nondZoo";
        Class[] cArg = new Class[1];
        cArg[0] = String.class;
        Class noparams[] = {};

        String fullClass = myPackage + "." + className.replace(" ", "");
        try {
            Class<?> animalClass = Class.forName(fullClass);
            Object obj = animalClass.getDeclaredConstructor(cArg).newInstance(animalName);
            Method method = animalClass.getDeclaredMethod("run", noparams);
            method.invoke(obj, null);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    /**
     * Gets the output of the animal's run() function
     * Puts it in its own output stream to return to the view
     * 
     * @param id    The index of the animal we want
     * @return      The output of the run() function as a string from the printStream
     */
    private String getAnimalOutput(String id) {
        // Create a stream to hold the output
        var newStream = new ByteArrayOutputStream();
        var newPrintStream = new PrintStream(newStream);

        // IMPORTANT: Save the old System.out!
        PrintStream old = System.out;
        // Tell Java to use your special stream
        System.setOut(newPrintStream);

        var intID = Integer.parseInt(id);
        var myList = Animal.getAnimalList();

        if ((intID > 0) && (intID <= myList.length)) {
            callAnimalRun(myList[intID - 1], myList[intID - 1] + " Tester");
        }

        // Put things back
        System.out.flush();
        System.setOut(old);
        String stringOutput = newStream.toString();
        return formatLineBreaks( stringOutput);
    }

    /**
     * Returns a Map with key value pairs of our animals and their IDs
     * 
     * @return  The map of ID and animal key value pairs
     */
    public static Map<Integer, String> getAllAnimalMap() {
        String[] animals = Animal.getAnimalList();
        int animalCount = animals.length;
        Map animalMap = Collections.synchronizedMap(new TreeMap<Integer, String>());

        for (int n = 0; n < animalCount; n++) {
            animalMap.put((n + 1), animals[n]);
        }
        System.out.println(animalMap);
        return animalMap;
    }
    
    public static Map<Integer, String> getEmployeeAnimals(String eType) {
        String[] animals = new String[1];
        switch( eType) {
            case "curator": {
                Curator cur = new Curator();
                animals = cur.getExhibits();
            }
            case "caretaker": {
                Caretaker caret = new Caretaker();
                animals[0] = caret.getAnimalAssignment();
            }
            default: {
                animals[0] = "";
            }
        }
        int animalCount = animals.length;
        Map animalMap = Collections.synchronizedMap(new TreeMap<Integer, String>());

        for (int n = 0; n < animalCount; n++) {
            animalMap.put((n + 1), animals[n]);
        }
        return animalMap;
    }
    
    /**
     * Returns a String for the name of an animal's Image
     * 
     * @param id    The ID of the index for the animal
     * @return      Return the file name of the animal's image
     */
    private String getAnimalImageLink(String id) {
        var intID = Integer.parseInt(id);
        var myList = Animal.getAnimalList();
 
        String imageName = "";       
        String testResult = "";
        if ((intID > 0) && (intID <= myList.length)) {
            imageName = myList[intID - 1];
        }
        imageName = imageName.replace(" ", "_").toLowerCase() + ".jpg";
        return imageName;   
    }
    
    private String getTestLink(String id) throws FileNotFoundException{
        var intID = Integer.parseInt(id);
        var myList = Animal.getAnimalList();
 
        String imageName = "";       
        String testResult = "";
        if ((intID > 0) && (intID <= myList.length)) {
            imageName = myList[intID - 1];
        }
        imageName = imageName.replace(" ", "_") + ".jpg";
        
        try {
            File file = ResourceUtils.getFile("/images/" + imageName);
            testResult = file.exists() ? "Exists" : "Not Found";
            //testResult = file.getPath();
        } catch (FileNotFoundException ex) {
            Logger.getLogger(ZooIndexController.class.getName()).log(Level.SEVERE, null, ex);
        }
        return ""+testResult;
    }
    
    /**
     * Returns the output of an employee's run() from the printStream as a String
     * 
     * @param empType   The type of employee we're creating
     * @return          The String value of the employee's run() functions
     */
    private String getEmployeeDetails(String empType) {
        // Create a stream to hold the output
        var newStream = new ByteArrayOutputStream();
        var newPrintStream = new PrintStream(newStream);

        // IMPORTANT: Save the old System.out!
        PrintStream old = System.out;
        // Tell Java to use your special stream
        System.setOut(newPrintStream);

        switch( empType) {
            case "curator": {
                Curator cur = new Curator();
                cur.run();
            }
            case "caretaker": {
                Caretaker caret = new Caretaker();
                caret.run();
            }
            default: {
                
            }
        }

        // Put things back
        System.out.flush();
        System.setOut(old);
        String stringOutput = newStream.toString();
        return formatLineBreaks( stringOutput);
    }
    
    /**
     * Gets the employeeTitle String from an Employee subclass
     * 
     * @param type  The employee type's name
     * @return      The employee's title as a String
     */
    private String getEmployeeName(String type) {
        String myName = "";
        switch (type) {
            case "curator": {
                Curator cur = new Curator();
                myName = cur.getEmployeeTitle();
            }
            case "caretaker": {
                Caretaker caret = new Caretaker();
                myName = caret.getEmployeeTitle();
            }
            default: {
                
            }
        }
        return myName;
    }
    
    /**
     * Gets the jobDescription String from an Employee subclass
     * 
     * @param type  The employee type's job description
     * @return      The employee's job description as a String
     */
    private String getEmployeeDescription(String type) {
        String description = "";
        switch (type) {
            case "curator": {
                Curator cur = new Curator();
                description = cur.getJobDescription();
            }
            case "caretaker": {
                Caretaker caret = new Caretaker();
                description = caret.getJobDescription();
            }
            default: {
                
            }
        }
        return description;
    }
        
    /**
     * Gets the visitor's payment to enter the zoo from a Visitor subclass
     * 
     * @param vType     The vistitor type as a string
     * @return          The visitor's entry fee converted from double to a string
     */
    public String getVisitorPayment( String vType) {
        String payment = "(You have paid an entry fee of $";
        switch (vType) {
            case "guest":{
                Guest gus = new Guest();
                payment += gus.getGroupCost();
            }
            case "member": {
                Member mem = new Member();
                payment += + mem.getGroupCost();
            }
            case "lifetimemember": {
                LifetimeMember lmem = new LifetimeMember();
                payment += + lmem.getGroupCost();
            }
            case "contestwinner": {
                ContestWinner cwin = new ContestWinner();
                payment += + cwin.getGroupCost();
            }
            default: {
                
            }
        }
        payment += ")";
        return payment;
    }
    
    /**
     * Formats a line of printed string output and replaces line breaks with <br>
     * 
     * @param output    The text output we wish to convert
     * @return          The text with line breaks replaced as <br>
     */
    public String formatLineBreaks(String output) {
        String formattedOutput = output.replace("\n", "<br>").replace("\r", "<br>");
        return formattedOutput;
    }
}
