import { z } from "zod";

// NOTE : 아이디는 최소 4자리 이상이여야하며, 특수문자를 포함할수 없고, 영문, 숫자만 가능합니다.
const idRegex = /^[a-zA-Z0-9]{4,}$/;

// NOTE : 비밀번호는 최소 8자리 이상이여야하며, 영문, 숫자, 특수문자가 모두 포함되어야 합니다.
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\-={}[\]:\";'<>?,./\\]).{8,}$/;

// NOTE : 생년월일 정규식 예시 ) 1999-01-01
const birthRegex = /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

// NOTE : 휴대폰 번호 정규식 예시 ) 01012345678
const phoneRegex = /^[0-9]{3}[0-9]{3,4}[0-9]{4}$/;

export const loginSchema = z.object({
  id: z
    .string()
    .min(4, { message: "아이디는 최소 4자리 이상이여야 합니다" })
    .max(100, { message: "아이디는 최대 100자리 이하여야 합니다" })
    .regex(idRegex, { message: "아이디를 다시 확인해주세요" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자리 이상이여야 합니다" })
    .max(100, { message: "비밀번호는 최대 100자리 이하여야 합니다" })
    .regex(passwordRegex, { message: "비밀번호를 다시 확인해주세요" }),
});

export const signUpSchema = z.object({
  id: z
    .string()
    .min(4, { message: "아이디는 최소 4자리 이상이여야 합니다" })
    .max(100, { message: "아이디는 최대 100자리 이하여야 합니다" })
    .regex(idRegex, { message: "특수 문자를 포함할수 없습니다" }),
  email: z.string().email({ message: "이메일을 다시 확인해주세요" }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자리 이상이여야 합니다" })
    .max(100, { message: "비밀번호는 최대 100자리 이하여야 합니다" })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자가 모두 포함 되어야 합니다",
    }),
  passwordConfirm: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자리 이상이여야 합니다" })
    .max(100, { message: "비밀번호는 최대 100자리 이하여야 합니다" })
    .regex(passwordRegex, {
      message: "영문, 숫자, 특수문자가 모두 포함 되어야 합니다",
    }),
  name: z
    .string()
    .min(2, { message: "이름은 두글자 이상이여야 합니다" })
    .max(100, { message: "이름은 100자리 이하여야 합니다" }),
  birthday: z.string().regex(birthRegex, {
    message: "생년월일을 다시 확인해주세요",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "최소 10자리 이상 입력해주세요" })
    .max(11, { message: "휴대폰 번호는 11자리 이상일수 없습니다" })
    .regex(phoneRegex, {
      message: "휴대폰 번호를 다시 확인해주세요",
    }),
});
