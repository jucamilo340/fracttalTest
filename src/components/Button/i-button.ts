export interface IButton {
  className?: string;
  onClick?: any;
  href?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'reset' | 'button';
  text: string;
  children?: string;
}
