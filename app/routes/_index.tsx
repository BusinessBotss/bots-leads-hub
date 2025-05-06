export default function ContactForm() {
  return (
    <form method="post">
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        Email:
        <input type="email" name="email" required />
      </label>
      <label>
        Message:
        <textarea name="message" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
