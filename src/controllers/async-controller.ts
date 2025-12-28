import { ReactiveController, ReactiveControllerHost } from 'lit';

export type AsyncStatus = 'idle' | 'pending' | 'success' | 'error';

export interface AsyncState<T> {
  status: AsyncStatus;
  data: T | null;
  error: Error | null;
}

/**
 * Controller for managing async operations with loading states
 * Useful for MCP tool calls and data fetching
 */
export class AsyncController<T> implements ReactiveController {
  host: ReactiveControllerHost;
  
  private _state: AsyncState<T> = {
    status: 'idle',
    data: null,
    error: null,
  };

  private _abortController: AbortController | null = null;

  constructor(host: ReactiveControllerHost) {
    this.host = host;
    host.addController(this);
  }

  get status() { return this._state.status; }
  get data() { return this._state.data; }
  get error() { return this._state.error; }
  get isIdle() { return this._state.status === 'idle'; }
  get isPending() { return this._state.status === 'pending'; }
  get isSuccess() { return this._state.status === 'success'; }
  get isError() { return this._state.status === 'error'; }

  async run(task: (signal: AbortSignal) => Promise<T>): Promise<T | null> {
    // Cancel any pending request
    this._abortController?.abort();
    this._abortController = new AbortController();

    this._setState({ status: 'pending', data: null, error: null });

    try {
      const result = await task(this._abortController.signal);
      this._setState({ status: 'success', data: result, error: null });
      return result;
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return null; // Silently handle aborts
      }
      const error = err instanceof Error ? err : new Error(String(err));
      this._setState({ status: 'error', data: null, error });
      return null;
    }
  }

  reset() {
    this._abortController?.abort();
    this._setState({ status: 'idle', data: null, error: null });
  }

  private _setState(state: AsyncState<T>) {
    this._state = state;
    this.host.requestUpdate();
  }

  hostDisconnected() {
    this._abortController?.abort();
  }
}

/**
 * Controller for tracking form field state with validation
 */
export class FormFieldController implements ReactiveController {
  host: ReactiveControllerHost;
  
  value = '';
  error = '';
  touched = false;
  
  private _validators: Array<(value: string) => string | null>;

  constructor(
    host: ReactiveControllerHost,
    validators: Array<(value: string) => string | null> = []
  ) {
    this.host = host;
    this._validators = validators;
    host.addController(this);
  }

  hostConnected() {
    // Controller connected to host
  }

  hostDisconnected() {
    // Controller disconnected from host
  }

  get isValid() { return !this.error; }
  get showError() { return this.touched && !!this.error; }

  setValue(value: string) {
    this.value = value;
    this._validate();
    this.host.requestUpdate();
  }

  touch() {
    this.touched = true;
    this._validate();
    this.host.requestUpdate();
  }

  reset() {
    this.value = '';
    this.error = '';
    this.touched = false;
    this.host.requestUpdate();
  }

  private _validate() {
    for (const validator of this._validators) {
      const result = validator(this.value);
      if (result) {
        this.error = result;
        return;
      }
    }
    this.error = '';
  }
}

// Common validators
export const validators = {
  required: (msg = 'Required') => (v: string) => v.trim() ? null : msg,
  minLength: (min: number, msg?: string) => (v: string) => 
    v.length >= min ? null : msg ?? `Min ${min} characters`,
  maxLength: (max: number, msg?: string) => (v: string) => 
    v.length <= max ? null : msg ?? `Max ${max} characters`,
  pattern: (regex: RegExp, msg: string) => (v: string) => 
    regex.test(v) ? null : msg,
  email: (msg = 'Invalid email') => (v: string) => 
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : msg,
};
