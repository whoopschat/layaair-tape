declare interface ES6Thenable <R> {
  then <U> (onFulfilled?: (value: R) => U | ES6Thenable<U>, onRejected?: (error: any) => U | ES6Thenable<U>): ES6Thenable<U>;
  then <U> (onFulfilled?: (value: R) => U | ES6Thenable<U>, onRejected?: (error: any) => void): ES6Thenable<U>;
}

declare class ES6Promise <R> implements ES6Thenable <R> {
  /**
   * If you call resolve in the body of the callback passed to the constructor,
   * your ES6Promise is fulfilled with result object passed to resolve.
   * If you call reject your ES6Promise is rejected with the object passed to resolve.
   * For consistency and debugging (eg stack traces), obj should be an instanceof Error.
   * Any errors thrown in the constructor callback will be implicitly passed to reject().
   */
  constructor (callback: (resolve : (value?: R | ES6Thenable<R>) => void, reject: (error?: any) => void) => void);

  /**
   * onFulfilled is called when/if "ES6Promise" resolves. onRejected is called when/if "ES6Promise" rejects.
   * Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called.
   * Both callbacks have a single parameter , the fulfillment value or rejection reason.
   * "then" returns a new ES6Promise equivalent to the value you return from onFulfilled/onRejected after being passed through ES6Promise.resolve.
   * If an error is thrown in the callback, the returned ES6Promise rejects with that error.
   *
   * @param onFulfilled called when/if "ES6Promise" resolves
   * @param onRejected called when/if "ES6Promise" rejects
   */
  then <U> (onFulfilled?: (value: R) => U | ES6Thenable<U>, onRejected?: (error: any) => U | ES6Thenable<U>): ES6Promise<U>;
  then <U> (onFulfilled?: (value: R) => U | ES6Thenable<U>, onRejected?: (error: any) => void): ES6Promise<U>;

  /**
   * Sugar for ES6Promise.then(undefined, onRejected)
   *
   * @param onRejected called when/if "ES6Promise" rejects
   */
  catch <U> (onRejected?: (error: any) => U | ES6Thenable<U>): ES6Promise<U>;

  /**
   * onSettled is invoked when/if the "ES6Promise" settles (either rejects or fulfills);
   *
   * @param onFinally called when/if "ES6Promise" settles
   */
  finally <U> (onFinally?: (callback: any) => U | ES6Thenable<U>): ES6Promise<U>;

  /**
   * Make a new ES6Promise from the ES6Thenable.
   * A ES6Thenable is ES6Promise-like in as far as it has a "then" method.
   */
  static resolve (): ES6Promise<void>;
  static resolve <R> (value: R | ES6Thenable<R>): ES6Promise<R>;

  /**
   * Make a ES6Promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error
   */
  static reject <R> (error: any): ES6Promise<R>;

  /**
   * Make a ES6Promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects.
   * the array passed to all can be a mixture of ES6Promise-like objects and other objects.
   * The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.
   */
  static all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>, T5 | ES6Thenable<T5>, T6 | ES6Thenable<T6>, T7 | ES6Thenable<T7>, T8 | ES6Thenable<T8>, T9 | ES6Thenable<T9>, T10 | ES6Thenable<T10>]): ES6Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
  static all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>, T5 | ES6Thenable<T5>, T6 | ES6Thenable<T6>, T7 | ES6Thenable<T7>, T8 | ES6Thenable<T8>, T9 | ES6Thenable<T9>]): ES6Promise<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
  static all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>, T5 | ES6Thenable<T5>, T6 | ES6Thenable<T6>, T7 | ES6Thenable<T7>, T8 | ES6Thenable<T8>]): ES6Promise<[T1, T2, T3, T4, T5, T6, T7, T8]>;
  static all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>, T5 | ES6Thenable<T5>, T6 | ES6Thenable<T6>, T7 | ES6Thenable<T7>]): ES6Promise<[T1, T2, T3, T4, T5, T6, T7]>;
  static all<T1, T2, T3, T4, T5, T6>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>, T5 | ES6Thenable<T5>, T6 | ES6Thenable<T6>]): ES6Promise<[T1, T2, T3, T4, T5, T6]>;
  static all<T1, T2, T3, T4, T5>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>, T5 | ES6Thenable<T5>]): ES6Promise<[T1, T2, T3, T4, T5]>;
  static all<T1, T2, T3, T4>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>, T4 | ES6Thenable <T4>]): ES6Promise<[T1, T2, T3, T4]>;
  static all<T1, T2, T3>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>, T3 | ES6Thenable<T3>]): ES6Promise<[T1, T2, T3]>;
  static all<T1, T2>(values: [T1 | ES6Thenable<T1>, T2 | ES6Thenable<T2>]): ES6Promise<[T1, T2]>;
  static all<T1>(values: [T1 | ES6Thenable<T1>]): ES6Promise<[T1]>;
  static all<TAll>(values: Array<TAll | ES6Thenable<TAll>>): ES6Promise<TAll[]>;

  /**
   * Make a ES6Promise that fulfills when any item fulfills, and rejects if any item rejects.
   */
  static race <R> (ES6Promises: (R | ES6Thenable<R>)[]): ES6Promise<R>;
}

/**
 * The polyfill method will patch the global environment (in this case to the ES6Promise name) when called.
 */
declare function polyfill (): void;
