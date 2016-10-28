import java.util.ArrayList;

public class SolveMeSolvedAdvanced {

    public static void main(String[] args) {
        System.out.println("The password is:");

        getPassword().forEach(str -> {
            if (isValidPassword(str.toCharArray())) {
                System.out.println("Success! The flag is : flag{" + str + "}");
            }
        });


    }

    private static ArrayList<String> getPassword() {
        int[] bytes = {
                0x94, 0xd1, 0x9d, 0xd1, 0x95, 0xd5, 0xc1, 0x1f, 0x5d, 0xde, 0x16, 0x89, 0x9d, 0x89, 0xde, 0xc1,
                0xd5, 0xde, 0xd4, 0x81, 0xde, 0x4e, 0xcd, 0x55, 0x7, 0xde, 0x1c, 0xcd, 0x1f,
        };

        ArrayList<String> passwords = new ArrayList<>();

        for (int aByte : bytes) {
            int offset = 0;
            for (char c = 0; c < Character.MAX_VALUE; c++) {
                int result = 0;
                result += (((((c & 0x1) << 2) & 0x7) >> 1) << 5);
                result += (((((~(((c & 0x10) << 7) | 0xff) ^ c) & 0x40) >> 2) << 3) >> 5);
                result += ((((c & 0x20) >> 2) & 0xf) >> 3);
                result += (~(~((c & 0x8) >> 1) << 4) >> 5);
                result += (((((~((c & 0x80) + (c & 0x20) + (c & 0x10)) ^ 0xff) & 0xc) >> 4) & 0x3) << 2);
                result += (((((c & 0x2) << 5) + 0x03) & 0x48) >> 2);
                result += (~(((((((c & 0x4) << 1)) ^ 0xff) >> 3) << 7) >> 4)) & 0x8;
                result += ((((c & 0x10) << 1) ^ 0x40) << 2);

                if ((result & 0xff) == aByte) {
                    if (offset >= passwords.size() || passwords.get(offset) == null) {
                        passwords.add(offset, "" + c);
                    } else {
                        passwords.set(offset, passwords.get(offset) + c);
                    }
                    offset++;
                }
            }

        }

        return passwords;
    }

    private static boolean isValidPassword(char[] pass) {
        int[] bytes = {
                0x94, 0xd1, 0x9d, 0xd1, 0x95, 0xd5, 0xc1, 0x1f, 0x5d, 0xde, 0x16, 0x89, 0x9d, 0x89, 0xde, 0xc1,
                0xd5, 0xde, 0xd4, 0x81, 0xde, 0x4e, 0xcd, 0x55, 0x7, 0xde, 0x1c, 0xcd, 0x1f,
        };

        if (bytes.length != pass.length) {
            return false;
        }

        for (int i = 0; i < pass.length; i++) {
            int result = 0;
            result += (((((pass[i] & 0x1) << 2) & 0x7) >> 1) << 5);
            result += (((((~(((pass[i] & 0x10) << 7) | 0xff) ^ pass[i]) & 0x40) >> 2) << 3) >> 5);
            result += ((((pass[i] & 0x20) >> 2) & 0xf) >> 3);
            result += (~(~((pass[i] & 0x8) >> 1) << 4) >> 5);
            result += (((((~((pass[i] & 0x80) + (pass[i] & 0x20) + (pass[i] & 0x10)) ^ 0xff) & 0xc) >> 4) & 0x3) << 2);
            result += (((((pass[i] & 0x2) << 5) + 0x03) & 0x48) >> 2);
            result += (~(((((((pass[i] & 0x4) << 1)) ^ 0xff) >> 3) << 7) >> 4)) & 0x8;
            result += ((((pass[i] & 0x10) << 1) ^ 0x40) << 2);

            if ((result & 0xff) != bytes[i]) {
                return false;
            }
        }

        return true;
    }
}
