import java.math.BigInteger;
import java.util.Scanner;

public class SolveMe2 {

    public static void main(String[] args) {
        System.out.print("Enter the password : ");
        String pass = (new Scanner(System.in)).nextLine();
        if(isValidPassword(pass.toCharArray())) {
            System.out.println("Success! The flag is : flag{" + pass + "}");
        } else {
            System.out.println("Wrong password... Try again");
        }
    }

    private static boolean isValidPassword(char[] pass) {
        BigInteger result = new BigInteger("42");

        for (char ch : pass) {
            result = result.multiply(new BigInteger("1337"));
            result = result.subtract(new BigInteger(""+(byte) ch));
        }
        return result.equals(new BigInteger("24974080420220936501599015063882221284254171161311573955830361553104016"));
    }
}
