import "@testing-library/react-native"
import "expect"

// Bridge native matchers to the expect types used by Jest 30.
declare module "expect" {
    interface Matchers<R extends void | Promise<void>, T = unknown> extends jest.Matchers<R, T> {}
}
