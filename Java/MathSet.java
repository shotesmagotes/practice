package chapter10Exercises;
import chapter2Exercises.TextIO;
import java.util.*;

public class MathSet {
	private ArrayList<TreeSet<Integer>> setColl;
	private ArrayList<Character> setOperation;
	private TreeSet<Integer> vars; 
	private TreeSet<Integer> result;
	
	public void lnRead(){
		setColl = new ArrayList<TreeSet<Integer>>();
		setOperation = new ArrayList<Character>();
		
		char nextChar;
		boolean flag = false;
		String vals;
		String value = "";
		
		do {
			nextChar = TextIO.getChar();
			if ( nextChar == '[' ){
				vars = new TreeSet<Integer>();
				while (TextIO.peek() != ']') {
					vals = TextIO.getChar() + "";
					try{
						Integer.parseInt(vals);
					} catch (NumberFormatException e){
						if (vals.equals(",")){
							vars.add(Integer.parseInt(value));
							value = "";
							vals = "";
						} else {
							System.out.println("Value of set is not an integer");
						}
					}
					value += vals;
				} 
				TextIO.getChar();
				setColl.add(vars);
				flag = true;
			} else if ( ( nextChar == '-' || nextChar == '+' || nextChar == '*' ) && flag ) {
				flag = false;
				setOperation.add(nextChar);
			} else {
				throw new IllegalArgumentException("Incorrect use of operator");
			}
			
		} while (TextIO.peek() != '\n' && TextIO.peek() != TextIO.EOF);
		result = calculateOutput();
	}
	
	private TreeSet<Integer> calculateOutput(){
		if (setColl.size() != (setOperation.size() + 1)){
			throw new IllegalArgumentException("Number of operands should be 1 less than number of sets");
		}
		
		if (setColl == null || setOperation == null){
			throw new NullPointerException("Set is not set or operation is not set");
		}
		
		for (Character c : setOperation){
			for (int i = 0 ; i < setColl.size() - 1; i++){
				if (c == '+')
					setColl.get(i).addAll(setColl.get(i+1));
				else if (c == '*')
					setColl.get(i).retainAll(setColl.get(i+1));
				else if (c == '-')
					setColl.get(i).removeAll(setColl.get(i+1));
				setColl.set(i+1, setColl.get(i));
			}
		}
		return setColl.get(setColl.size()-1);
	}

	@Override
	public String toString() {
		return "MathSet [result=" + result + "]";
	}
	
	
}
