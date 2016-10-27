import java.math.BigInteger;

public class SolveMe2Solved {

    public static void main(String[] args) {
        System.out.print("Enter the password : ");
        String pass = getPassword();
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

    private static String getPassword() {
        BigInteger base = new BigInteger("42");
        BigInteger result = new BigInteger("24974080420220936501599015063882221284254171161311573955830361553104016");
        String password = "";
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_";
        while(true) {
            for(char ch : chars.toCharArray()) {
                if ((result.add(new BigInteger("" + (byte) ch))).mod(new BigInteger("1337")).equals(new BigInteger("0"))) {
                    password += ch;
                    result = (result.add(new BigInteger("" + (byte) ch))).divide(new BigInteger("1337"));
                }
                if (result.equals(base)) {
                    return new StringBuilder(password).reverse().toString();
                }
            }
        }
    }
}
